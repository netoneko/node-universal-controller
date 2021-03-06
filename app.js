var posts = require('./posts');
var controllers = [posts];

var express = require('express');
var app = express();
app.use(express.static(__dirname + "/public"));

app.init = function(io, redis) {
  if (io) {
    io.sockets.on("connection", function(socket) {
      controllers.map(function(controller) {
        controller.websocket(socket);
      });
    });
  }

  if (redis) {
    controllers.map(function(controller) {
      controller.redis(redis);
    });
  }

  controllers.map(function(controller) {
    controller.rest(app);
  });
};

module.exports = app;
