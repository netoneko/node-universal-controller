var posts = require('./posts');
var express = require('express');
var app = express();

posts.rest(app);

module.exports = app;
