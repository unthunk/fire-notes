// declare what firebase db we want to use e.g. https://<YOUR-FIREBASE-APP>.firebaseio.com
var firebase = config.firebase;

// create a firebase reference
var ref = new Firebase(firebase);

/* global angular */

// add services to our app and inject
var app = {
  name: 'fireNotesApp',
  controllers: angular.module('notesAppControllers', []),
  services: angular.module('notesAppServices', [])
};

var notesApp = angular.module(app.name, ['notesAppControllers', 'notesAppServices', 'ngRoute', 'firebase'])

  .config(['$routeProvider' ,function ($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'mainCtrl',
        templateUrl: 'app/views/main/main.html'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);
