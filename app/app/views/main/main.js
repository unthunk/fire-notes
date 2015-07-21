'use strict';

/* global app */


app.controllers
  .controller('mainCtrl', ['$scope', 'Auth', function ($scope, Auth) {

    // bind these to inputs on login/register form
    $scope.user = {
      email: '',
      password: ''
    };

    // we want to be able to tell if a user is logged in or not
    // we can use authData in the template to show/hide stuff
    $scope.auth = Auth.authObj;
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
    });


    // method to login using our Auth service
    $scope.login = function() {

      Auth.login($scope.user)
      .then(function(authData){

        // after the user logs in what do we want to do?
        console.log('logged in',authData);

      })
      .catch(function(error){
        // do things if failure
        console.log('oops! ' + error);
      });
    };

    // method to register using our Auth service
    $scope.register = function() {

      Auth.register($scope.user)
      .then(function(authData){

        // after the user registers what do we want to do?
        console.log('user', authData);

      }, function(error){
        // do things if failure
        console.log('oops! ' + error);
      });
    };

}]);
