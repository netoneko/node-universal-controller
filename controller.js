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
   appendRoute(function(route) {
     socket.on(route, function(data) {
       var request = { "params": data };
       var value = handlers[route](request);

       socket.emit("update", { "status": 200, "data": value });
     });
  });
 };

  return this;
};

module.exports = controller;
