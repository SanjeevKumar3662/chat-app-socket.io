import express from "express";
import { Server } from "socket.io"; //
import { createServer } from "http";
import formatMessage from "./utils/messages.js";
import {
  getCurrentUser,
  userJoin,
  getRoomUsers,
  userLeave,
} from "./utils/users.js";

const PORT = 3000;
const botName = "Our Bot";

const app = express();

app.use(express.static("public"));

const server = createServer(app);
const io = new Server(server); //

io.on("connection", (socket) => {
  console.log(`New socket connected : ${socket.id}`);

  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    // console.log(user);

    socket.join(user.room);

    socket.emit("message", formatMessage(botName, "Wellcome my boy"));

    //Brodcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );
    //Brodcast when a user disconects
  });
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );
    }
  });

  socket.on("chatMessage", (data) => {
    const user = getCurrentUser(socket.id);
    console.log(data);

    io.to(user.room).emit("message", formatMessage(user.username, data));
  });
});

app.get("/", (_, res) => {
  res.sendFile("/index.html");
});

server.listen(PORT, () => {
  //
  console.log("Server is listening at PORT : ", PORT);
});
