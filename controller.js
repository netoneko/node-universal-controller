var controller = function(handlers) {
  this.subHandlers = handlers.reduce(function(memo, action) {
    memo[action.sub] = action.handler;
    return memo;
  }, {});

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

 this.redis = function(redis) {
   redis.on("message", function (channel, message) {
     try {
       var json = JSON.parse(message.toString());
       var request = { "params": json };
       var value = subHandlers[channel](request);
       console.log(value);
     } catch(e) { }
   });

   appendRoute(function(action) {
     if (!action.sub) {
       return;
     }

     redis.subscribe(action.sub);
   });
 };

  return this;
};

module.exports = controller;
