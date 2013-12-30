var request = require('supertest');
var app = require('../index');
app.init();

var item = {
  "title": "Hello",
  "text": "World!"
};

describe("GET /posts", function(){
  it("respond with json", function(done){
    request(app)
    .get("/posts")
    .expect([item])
    .expect(200, done);
  });
});
