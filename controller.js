var _ = require('underscore');

var controller = function(handlers) {
  var self = this;
  this.handlers = handlers;

  this.rest = function(app) {
    _.keys(self.handlers).map(function(route) {
      app.get(route, handlers[route]);
    });
  };

  return this;
};

module.exports = controller;
