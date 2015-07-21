'use strict';

/* global app, Firebase */

// note controller and the modules we will want to use
app.controllers
  .controller('noteCtrl', ['$scope', '$routeParams', '$firebaseObject', 'Auth', 'Notes', '$location', function ($scope, $routeParams, $firebaseObject, Auth, Notes, $location) {
    if(!$routeParams.item){
      var name = Notes.generateNoteName();
      $location.path('/note/'+name);
    }

}]);
