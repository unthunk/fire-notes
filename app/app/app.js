// declare what firebase db we want to use e.g. https://<YOUR-FIREBASE-APP>.firebaseio.com
var firebase = config.firebase;

// create a firebase reference
var ref = new Firebase(firebase);

/* global angular */

var app = {
  name: 'fireNotesApp',
  controllers: angular.module('notesAppControllers', []),
  services: angular.module('notesAppServices', []),
  filters: angular.module('notesAppFilters', [])
};

var notesApp = angular.module(app.name, ['notesAppControllers', 'notesAppServices', 'notesAppFilters', 'ngRoute', 'firebase'])

  .config(['$routeProvider' ,function ($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'mainCtrl',
        templateUrl: 'app/views/main/main.html'
      })
      .when('/note', {
        controller: 'noteCtrl',
        templateUrl: 'app/views/note/note.html'
      })
      .when('/note/:item', {
        controller: 'noteCtrl',
        templateUrl: 'app/views/note/note.html'
      })
      .when('/notes', {
        controller: 'notesCtrl',
        templateUrl: 'app/views/notes/notes.html'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);
