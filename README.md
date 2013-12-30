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

