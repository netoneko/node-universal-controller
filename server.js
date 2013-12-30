var app = require("./index");
var http = require("http").createServer(app);
var io = require("socket.io").listen(http);

app.init(io);

http.listen(3000);
