var controller = require('./controller');
var item = {
  "id": 1,
  "title": "Hello",
  "text": "World!"
};

var posts = controller({
  "/posts": function(req) {
    return [item];
  },
  "/posts/:id": function(req) {
    var id = parseInt(req.params.id, 10);
    return item.id === id ? item : {};
  }
});

module.exports = posts;
