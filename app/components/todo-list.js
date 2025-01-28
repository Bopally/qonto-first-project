import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TodoListComponent extends Component {
  @tracked tasks = []; // Liste des tâches
  @tracked newTask = ''; // Texte en cours dans le champ d'ajout
  @tracked editingIndex = null; // Index de la tâche en cours d'édition
  @tracked editedTask = ''; // Texte en cours dans le champ d'édition

  // Met à jour la valeur de `newTask` en temps réel
  @action
  createNewTask(event) {
    this.newTask = event.target.value;
  }

  // Ajoute une nouvelle tâche à la liste
  @action
  addTask() {
    if (this.newTask.trim()) {
      if (!this.tasks.includes(this.newTask.trim())) {
        // Empêche les doublons
        this.tasks = [...this.tasks, this.newTask.trim()];
        this.newTask = ''; // Réinitialise le champ
      } else {
        console.error('Cette tâche existe déjà.'); // Affiche une erreur en cas de doublon
      }
    } else {
      console.error('La tâche ne peut pas être vide.');
    }
  }

  // Supprime une tâche de la liste
  @action
  removeTask(index) {
    this.tasks = this.tasks.filter((_, i) => i !== index);
  }

  // Active le mode édition pour une tâche spécifique
  @action
  startEditing(index, task) {
    this.editingIndex = index;
    this.editedTask = task;
  }

  // Met à jour la valeur en cours dans le champ d'édition
  @action
  updateEditedTask(event) {
    this.editedTask = event.target.value;
  }

  // Sauvegarde les modifications apportées à la tâche
  @action
  saveTask(index) {
    if (this.editedTask.trim()) {
      this.tasks = this.tasks.map((task, i) =>
        i === index ? this.editedTask.trim() : task,
      );
      this.editingIndex = null; // Quitte le mode édition
      this.editedTask = ''; // Réinitialise le champ
    } else {
      console.error('La tâche modifiée ne peut pas être vide.');
    }
  }

  // Annule le mode édition sans modifier la tâche
  @action
  cancelEditing() {
    this.editingIndex = null;
    this.editedTask = '';
  }
}
