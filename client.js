var io = require("socket.io-client");
var socket = io.connect("http://localhost:3000/");

socket.on("connect", function () {
  socket.emit("show post", { "id": 1 });
});

socket.on("update", function(response) {
  if (response.status !== 200) {
    return;
  }

  var template = function(post) {
    var title = "<h1>" + post.title + "</h1>";
    var text = "<p>" + post.text + "</p>";
    return title + text;
  };

  document.body.innerHTML = template(response.data);
});

