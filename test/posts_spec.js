var request = require('supertest');
var app = require('../index');
app.init();

var item = {
  "id": 1,
  "title": "Hello",
  "text": "World!"
};

describe("GET /posts", function() {
  it("responds with json", function(done) {
    request(app)
    .get("/posts")
    .expect([item])
    .expect(200, done);
  });
});

describe("GET /posts/:id", function() {
  it("responds with json", function(done) {
    request(app)
    .get("/posts/1")
    .expect(item)
    .expect(200, done);
  });

  it("returns empty object if nothing is there", function(done) {
    request(app)
    .get("/posts/7")
    .expect({})
    .expect(200, done);
  });
});
