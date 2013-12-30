var controller = require("./controller");
var action = require("./action");

var item = {
  "id": 1,
  "title": "Hello",
  "text": "World!"
};

var posts = controller([
  action("/posts", "show posts", function(req) {
      return [item];
    }),
  action("/posts/:id", "show post", "posts:show", function(req) {
      var id = parseInt(req.params.id, 10);
      return item.id === id ? item : {};
    })
  ]);

module.exports = posts;
