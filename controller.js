var _ = require('underscore');

var controller = function(handlers) {
  this.rest = function(app) {
    _.keys(handlers).map(function(route) {
      app.get(route, handlers[route]);
    });
  };

  return this;
};

module.exports = controller;
