// add a reference to expressjs and create a new express app
const express = require("express");
const app = express();

// Add a reference to HTTP, and create a new server with the express framework I created above
const http = require("http");
const server = http.Server(app);

// extend server to support websockets for make chat responsive in realtime
const sockets = require("socket.io");
io = sockets(server);

// code to handle new connection events and incoming messages from clients
io.on('connection', function(connection) {
  connection.on('message', function (data) {
    console.log('new message: ' + data);
    io.emit("broadcast", data);
  });
});

//code to start the server
server.listen(3000, function() {
  console.log("listening on port 3000");
});
