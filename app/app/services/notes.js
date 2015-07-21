'use strict';

/* global app, Firebase */

app.services
.factory('Notes', ['$firebaseAuth', '$firebaseObject', '$firebaseArray', function($firebaseAuth, $firebaseObject, $firebaseArray){

  // setup firebase ref
  var url = config.firebase +'notes/';
  var ref = new Firebase(url);
  var notesObj = $firebaseObject(ref);

  // we'll use these to make easy to share notes
  var words = {
    adjectives : ['speedy','orange','green','interstellar','meta','grinning','patient','boisterous','relaxed','sassy','skyward','cheeky','aware','robotic','zen','brawny','misty','sunny','leaping','steady','cartwheeling','stoic','translucent','eager','aloft'],
    thing1 : ['marsupial','cheetah','panda','locomotive','potato','caribou','coconut','owl','quark','capybara','badger','meerkat','bagel','avocado','caracal','bonzai','fawn','doorway','star','nebula','rocket','leaf','sodapop','emu','houseboat','diamond','centaur','lodestone','gazelle'],
    thing2 : ['adventure','figurine','umbrella','hooligans','seafarer','dream','dancer','professor','wanderers','caper','villa','cat','dog','lark','trumpet','writer','banjo','pangolin','turtle','garden','wrangler','ahoy','surfer','astronaut','mango','story','acacia','waveform','egg']
  };

  // define what we want the service to return
  var myObj = {

    notesObj: notesObj,

    // return an array of whatever is in the notes node
    getNotes: function() {
      return $firebaseArray(ref);
    },

    // generate an easy to remember note name
    generateNoteName: function() {
      var word1 = words.adjectives[getRandomInt(0,words.adjectives.length)],
        word2 = words.thing1[getRandomInt(0,words.thing1.length)],
        word3 = words.thing2[getRandomInt(0,words.thing2.length)];

      return word1 + '-' + word2 + '-' + word3;
    }

  };

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  return myObj;
}]);
