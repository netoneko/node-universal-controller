var controller = require('./controller');

var posts = controller({
  "/posts": function(req) {
    var item = {"title": "Hello", "text": "World!"};
    return [item];
  }
});

module.exports = posts;
