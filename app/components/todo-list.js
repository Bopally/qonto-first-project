import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TodoListComponent extends Component {
  @tracked tasks = [];
  @tracked newTask = '';

  // Fonction pour créer une nouvelle tâche
  @action
  createNewTask(event) {
    this.newTask = event.target.value;
    // Met à jour `newTask` avec le texte écrit par l'utilisateur
  }

  // Fonction pour ajouter une tâche
  @action
  addTask() {
    if (this.newTask.trim()) {
      this.tasks = [...this.tasks, this.newTask];
      this.newTask = '';
    }
  }

  // Fonction pour supprimer une tâche
  @action
  removeTask(index) {
    this.tasks = this.tasks.filter((_, i) => i !== index);
  }
}
