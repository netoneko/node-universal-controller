var io = require("socket.io-client");
var socket = io.connect("http://localhost:3000/");

socket.on("connect", function () {
  socket.emit("/posts");
});

socket.on("update", function(response) {
  if (response.status !== 200) {
    return;
  }

  document.body.innerHTML = response.data.map(function(post) {
    var title = "<h1>" + post.title + "</h1>";
    var text = "<p>" + post.text + "</p>";
    return title + text;
  }).join("\n");
});

