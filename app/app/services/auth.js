'use strict';

/* global app, Firebase */

app.services
.factory('Auth', ['$firebaseAuth', function($firebaseAuth){
  var ref = new Firebase(config.firebase);

  // $firebaseAuth wraps the authentication methods in Firebase
  var authObj = $firebaseAuth(ref);

  // let's store some additional data about the user
  function saveProfile(authData) {
    console.log('save profile',authData);

    return ref.child('users').child(authData.uid).update({
      provider: authData.provider,
      name: getName(authData),
      email: authData.password.email
    });
  }

  // a name for the user would be handy
  function getName(authData) {
    switch(authData.provider) {
      case 'password':
      return authData.password.email.replace(/@.*/, '');
      case 'twitter':
      return authData.twitter.displayName;
      case 'facebook':
      return authData.facebook.displayName;
    }
  }

  // define what we want the service to return
  var myObj = {
    
    // include authObj as a convenience for checking $onAuth
    authObj: authObj,

    // we want to create a user and save some profile data for them
    register: function(user) {
      return authObj.$createUser(user)
      .then(function(authData){
        console.log('I have authData',authData);
        return myObj.login(user);
      })
      .then(function(authData){
        // save a user profile
        saveProfile(authData);
      }).then(function(authData){
        return authData;
      });
    },

    // expose login
    login: function(user) {
      return authObj.$authWithPassword({
        email: user.email,
        password: user.password
      });
    },

    // expose logout
    logout: function() {
      return authObj.$unauth();
    }

  };

  return myObj;
}]);
