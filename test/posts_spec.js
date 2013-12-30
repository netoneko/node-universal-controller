var request = require('supertest');
var app = require('../index');

var item = {
  "title": "Hello",
  "text": "World!"
};

var stringify = function(object){
  return JSON.stringify(object, null, "  ");
};

describe("GET /posts", function(){
  it("respond with json", function(done){
    request(app)
    .get("/posts")
    .expect([item])
    .expect(200, done);
  });
});
