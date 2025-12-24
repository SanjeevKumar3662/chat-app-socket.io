import express from "express";
import { Server } from "socket.io"; //
import { createServer } from "http";
import formatMessage from "./utils/messages.js";

const PORT = 3000;
const botName = "Our Bot";

const app = express();

app.use(express.static("public"));

const server = createServer(app);
const io = new Server(server); //

io.on("connection", (socket) => {
  console.log(`New socket connected : ${socket.id}`);

  socket.emit("message", formatMessage(botName, "Did you get my message"));

  //Brodcast when a user connects
  socket.broadcast.emit(
    "message",
    formatMessage(botName, "A user has joined the chat")
  );

  //Brodcast when a user disconects
  socket.on("disconnect", () => {
    io.emit("message", formatMessage(botName, "A user has left the chat"));
  });

  socket.on("chatMessage", (data) => {
    console.log(data);
    io.emit("message", formatMessage("user", data));
  });
});

app.get("/", (_, res) => {
  res.sendFile("/index.html");
});

server.listen(PORT, () => {
  //
  console.log("Server is listening at PORT : ", PORT);
});
