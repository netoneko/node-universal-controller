# node-universal-controller

## How to run

* Clone the repo.
* Install Node.js (`brew install node` if you have a Mac)
* `npm install`
* `npm start`
* Open [http://localhost:3000/](http://localhost:3000)

## How to develop

* `watch -n 3 "browserify client.js > public/lib/dist.js"`

## How to test
* `npm test`
* `redis-cli PUBLISH "posts:show" "{\"id\": 1}"` when server is running should print an item to server logs.

## How does it work

This is a proof concept MVC app where controllers can register and respond to any of these interfaces: HTTP, Socket.io or Redis Pub/Sub.

Basic controller looks like this (take a peek at `posts.js`):

```js
var controller = require("./controller");
var action = require("./action");

var posts = controller([
  action("/posts", "show posts", "posts:all", function(req) {
    return { "text": "Hello, World!" };
  })]);

module.exports = posts;
```

`controller` and `action` are helper functions that help us to build our app. `controller` takes an array of `action`s as an argument.

`action` take 4 parameters: `path` for HTTP, `socket` command, Redis `sub` and a handler, a simple function that takes request and processes it. `req` parameter can be standard `app.request` of Express.js or a mock object that contains only `request.params` if it comes through Sockets or Redis.

If you don't want to answer to one of the ways to call the controller, just put there `false` instead of the parameter like this: `action("/posts", false, "posts:all", callback)`.

### `app.js`

Here the `app.init()` function is defined which wires everything together following inversion of control pattern. `app.init()` takes two parameters: `io` and `redis`, which are defined in `server.js`.

On top of the files an array of `controllers` is defined. Every controller is initialized inside of `app.init()` function by calling `controller.websocket()`, `controller.redis()` and `controller.rest()`.

### `controller.js`

This is where the magic happens. When one of the initializing functions is called, it binds handler to the Socket.io or Redis event or creates a standard Express route.

You can simply access a controller through this API:
* HTTP: `GET /posts/:id`
* Socket.io: `socket.emit("show post", { "id": 1 })` (look up `client.js` for the details).
* Redis: `PUBLISH "posts:all" "{\"id\": 1}"`

Note that for Socket.io and Redis I pass JSON object as a parameter. This object will be bound to `request.params`.

