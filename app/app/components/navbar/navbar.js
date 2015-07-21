'use strict';

/* global app */

app.controllers
.controller('navbarCtrl', ['$scope', 'Auth', function ($scope, Auth) {
  $scope.profile = {
    name: '',
    email: ''
  };

  $scope.auth = Auth.authObj;

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
