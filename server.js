var app = require("./index");
var http = require("http").createServer(app);
var io = require("socket.io").listen(http);
var redis = require("node-redis").createClient();

app.init(io, redis);

http.listen(3000);
