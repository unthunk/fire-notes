'use strict';

/* global app, Firebase */

// note controller and the modules we will want to use
app.controllers
.controller('noteCtrl', ['$scope', '$routeParams', '$firebaseObject', 'Auth', 'Notes', '$location', function ($scope, $routeParams, $firebaseObject, Auth, Notes, $location) {
  if(!$routeParams.item){
    var name = Notes.generateNoteName();
    $location.path('/note/'+name);

  }
  else {

    $scope.data = {};
    $scope.item = $routeParams.item || false;
    $scope.placeholder = 'my super awesome firenote';
    $scope.noteTitle = '';
    $scope.editingTitle = false;

    $scope.titleText = function() {
      return $scope.data.title || $scope.placeholder;
    };

    $scope.editTitle = function(e) {
      e.preventDefault();
      console.log('editing');
      $scope.editingTitle = true;
      setTimeout(function(){
        var el = document.querySelector('#note-title');
        el.focus();
      }, 100);

    };

    $scope.blurTitle = function() {
      console.log('done editing');
      $scope.editingTitle = false;
    };


    // firebase setup for firepad
    $scope.auth = Auth.authObj;
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
        if (authData) {

          // element where the firepad will go
          var firepadElement = '#firepad-container';

          // create a firebase ref for this note
          var firepadRef = new Firebase(config.firebase+'notes/' + $routeParams.item + '/');

          // start the codemirror editor
          var codeMirror = new CodeMirror(document.querySelector(firepadElement), { lineWrapping: true });

          // start firepad
          var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {richTextShortcuts: true, richTextToolbar: true, userId: authData.uid });

          // download the data into a local object
          var notesObj = $firebaseObject(firepadRef);

          // synchronize the object with a three-way data binding, this will sync up
          // additional items like note title
          notesObj.$bindTo($scope, 'data');

          // store the raw content of the firepad
          firepad.on('ready', function() {
          // Firepad is ready.

          // get raw text of note
          var text = firepad.getText();
          console.log('i should be ready now', text);


          $scope.$apply();

        });
        firepad.on('synced', function(isSynced) {
            // isSynced will be false immediately after the user edits the pad,
            // and true when their edit has been saved to Firebase.


            // get raw text of note
            var text = firepad.getText();

            //sync text to firebase
            firepadRef.child('text').set(text);


        });

        }
        else {
          console.log("Logged out");
        }
      });
    }

  }]);
