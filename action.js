var action = function() {
  var args = Array.prototype.slice.call(arguments);
  var path = args.shift();
  var handler = args.pop();
  var socket = args.shift();
  var sub = args.shift();

  return {
    "path": path,
    "socket": socket,
    "sub": sub,
    "handler": handler
  };
};

module.exports = action;
