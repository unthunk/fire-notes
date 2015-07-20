// a simple express server to serve static files
var express = require('express');

var path = '/app';

var app = express();

// serve bower_components from correct directory
app.use('/bower_components',express.static(__dirname + '/bower_components'));

// serve config file for demo purposes
app.use('/config',express.static(__dirname + '/config'));

// serve app
app.use(express.static(__dirname + path));
console.log('server started at port 3001');

app.listen(3001);
