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
  // 1st arg of emit is the event name, 2nd is the data we want to provide
  console.log(socket.id, "has joined us");
  socket.emit("welcome", "Welcome to the chat!");

  socket.on("toServer", (data) => {
    console.log("toServer", data);
    io.emit("welcome", data);
  });
});
server.listen(3000, () => {
  console.log("server running");
});
