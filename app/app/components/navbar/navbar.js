'use strict';

/* global app */


app.controllers
.controller('navbarCtrl', ['$scope', 'Auth', function ($scope, Auth) {
  $scope.profile = {
    name: '',
    email: ''
  };

  // we want to be able to tell if a user is logged in or not
  $scope.auth = Auth.authObj;
  // $onAuth listens for changes to the client's authentication state
  $scope.auth.$onAuth(function(authData) {
    $scope.authData = authData;
    if (authData) {
      // when a use logs in we could do something useful like get their profile
      console.log('logged in');
    } else {
      console.log('logged out');
    }
  });

  $scope.logout = function() {
    Auth.logout();
  };

}]);
