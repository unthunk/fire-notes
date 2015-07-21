'use strict';

/* global app */


app.filters
  .filter('linebreaks', function() {
    return function(input) {
    input = input.replace(/\n/g,'<br/>');
    return input;
  };
});
