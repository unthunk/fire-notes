'use strict';

/* global app */

// include $location
app.controllers
  .controller('mainCtrl', ['$scope', 'Auth', '$location', function ($scope, Auth, $location) {

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
        console.log('logged in',authData);

        // after the user logs in what do we want to do? show then thier notes
        $location.path('/notes');

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
        console.log('user', authData);

        // after the user registers what do we want to do? send them to their first note
        $location.path('/note');        

      }, function(error){
        // do things if failure
        console.log('oops! ' + error);
      });
    };

}]);
