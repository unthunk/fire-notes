'use strict';

/* global Firebase, app */


app.controllers
  .controller('notesCtrl', ['$scope', '$firebaseObject','$location', 'Notes', 'Auth', function ($scope, $firebaseObject, $location, Notes, Auth) {

    $scope.notes;

    $scope.auth = Auth.authObj;
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;

      // if we have authData we should get notes for the user
      if (authData) {

        $scope.notes = Notes.getNotes(authData.uid);
        console.log($scope.notes);

      }
    });

}]);
