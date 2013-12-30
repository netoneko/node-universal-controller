var controller = require('./controller');

var posts = controller({
  "/posts": function(req, res) {
    var item = {"title": "Hello", "text": "World!"};
    res.send([item]);
  }
});

module.exports = posts;
