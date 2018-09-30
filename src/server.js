const server = require("http").createServer(function(req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write("Hello World!");
  res.end();
});

const port = process.env.PORT || 8500;
const io = require("socket.io")(server);

io.on("connection", function(client) {
  client.on("message", function({ chatroomName, message } = {}, callback) {
    console.log({ chatroomName, message });
    client.broadcast.emit("message", { chatroomName, message });
  });

  client.on("error", function(err) {
    console.log("received error from client:", client.id);
    console.log(err);
  });
});

server.listen(port, function(err) {
  if (err) throw err;
  console.log("listening on port " + port);
});
