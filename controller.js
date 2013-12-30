var controller = function(handlers) {
  appendRoute = function(callback) {
    handlers.map(callback);
  };

  this.rest = function(app) {
    appendRoute(function(action) {
      if (!action.path) {
        return;
      }

      app.get(action.path, function(request, response) {
        var value = action.handler(request);
        response.send(value);
      });
    });
  };

 this.websocket = function(socket) {
   appendRoute(function(action) {
     if (!action.socket) {
       return;
     }

     socket.on(action.socket, function(data) {
       var request = { "params": data };
       var value = action.handler(request);

       socket.emit("update", { "status": 200, "data": value });
     });
  });
 };

  return this;
};

module.exports = controller;
