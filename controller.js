var controller = function(handlers) {
  this.subHandlers = handlers.reduce(function(memo, action) {
    memo[action.sub] = action.handler;
    return memo;
  }, {});

  appendRoute = function(key, callback) {
    handlers.map(function(action) {
      if (action[key]) {
        callback(action);
      }
    });
  };

  this.rest = function(app) {
    appendRoute("path", function(action) {
      app.get(action.path, function(request, response) {
        var value = action.handler(request);
        response.send(value);
      });
    });
  };

 this.websocket = function(socket) {
   appendRoute("socket", function(action) {
     socket.on(action.socket, function(data) {
       var request = { "params": data };
       var value = action.handler(request);

       socket.emit("result(" + action.socket +")", { "status": 200, "data": value });
     });
  });
 };

 this.redis = function(redis) {
   redis.on("message", function (channel, message) {
     try {
       var request = { "params": JSON.parse(message.toString()) };
       var value = subHandlers[channel](request);
       console.log(value);
     } catch(e) { }
   });

   appendRoute("sub", function(action) {
     redis.subscribe(action.sub);
   });
 };

  return this;
};

module.exports = controller;
