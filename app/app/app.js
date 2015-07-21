// declare what firebase db we want to use e.g. https://<YOUR-FIREBASE-APP>.firebaseio.com
var firebase = config.firebase;

// create a firebase reference
var ref = new Firebase(firebase);

/* global angular */

var app = {
  name: 'fireNotesApp',
  controllers: angular.module('notesAppControllers', [])
};

var notesApp = angular.module(app.name, ['notesAppControllers','ngRoute'])

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
