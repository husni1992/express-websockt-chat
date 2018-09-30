const express = require("express");
const io = require("socket.io")(server);

io.on("connection", function(client) {
  client.on("register", handleRegister);

  client.on("join", handleJoin);

  client.on("leave", handleLeave);

  client.on("message", handleMessage);

  client.on("chatrooms", handleGetChatrooms);

  client.on("availableUsers", handleGetAvailableUsers);

  client.on("disconnect", function() {
    console.log("client disconnect...", client.id);
    handleDisconnect();
  });

  client.on("error", function(err) {
    console.log("received error from client:", client.id);
    console.log(err);
  });
});

const server = express();
const port = 3000;

server.listen(port, function(err) {
  if (err) throw err;
  console.log("listening on port " + port);
});
