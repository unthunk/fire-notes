'use strict';

/* global app */

app.controllers
  .controller('mainCtrl', ['$scope', 'Auth', '$location', function ($scope, Auth, $location) {

    $scope.user = {
      email: '',
      password: ''
    };

    $scope.auth = Auth.authObj;
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
    });


    $scope.login = function() {

      Auth.login($scope.user)
      .then(function(authData){
        console.log('logged in',authData);

        // show user thier notes
        $location.path('/notes');

      })
      .catch(function(error){
        console.log('oops! ' + error);
      });
    };

    $scope.register = function() {

      Auth.register($scope.user)
      .then(function(authData){
        console.log('user', authData);

        // generate a new note
        $location.path('/note');

      }, function(error){
        console.log('oops! ' + error);
      });
    };

}]);
