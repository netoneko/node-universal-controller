var controller = function(handlers) {
  appendRoute = function(callback) {
    Object.keys(handlers).map(callback);
  };

  this.rest = function(app) {
    appendRoute(function(route) {
      app.get(route, function(request, response) {
        var value = handlers[route](request);
        response.send(value);
      });
    });
  };

 this.websocket = function(socket) {
   appendRoute(function() {
     socket.on("/posts", function(data) {
       var request = { "params": data };
       var value = handlers[route](request);

       io.sockets.emit("update", { "status": 200, "data": value });
     });
  });
 };

  return this;
};

module.exports = controller;
