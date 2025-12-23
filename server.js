import express from "express";
import { createServer } from "http";

import { Server } from "socket.io";

const app = express();
app.use(express.static("public"));

const server = createServer(app);
const io = new Server(server);

app.get("/", (_, res) => {
  res.sendFile("/index.html");
});

io.on("connection", (socket) => {
  console.log(socket.id, "has joined us");
  // 1st arg of emit is the event name, 2nd is the data we want to provide
  socket.emit("welcome", [1, 2, 3]);

  socket.on("thankYou", (data) => {
    console.log("other data", data);
  });
});
server.listen(3000, () => {
  console.log("server running");
});
