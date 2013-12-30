var app = require("./index");
var express = require("express");

app.use(express.static(__dirname + "/public"));

var http = require("http").createServer(app);
var io = require("socket.io").listen(http);

io.sockets.on("connection", function (socket) {
  socket.on("/posts", function(data) {
    io.sockets.emit("update", {"status": 200, data: [{"title": "Hello", "text": "World!"}]});
  });
});

http.listen(3000);
