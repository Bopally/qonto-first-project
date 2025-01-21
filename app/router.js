import EmberRouter from '@ember/routing/router';
import config from 'qonto-first-project/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = '/';
}

Router.map(function () {
  this.route('homepage', { path: '/' }); // Associe la racine `/` à la route homepage
});
