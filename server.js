import express from "express";
import { Server } from "socket.io";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
const expressServer = app.listen(PORT);

// console.log(expressServer);

const io = new Server(expressServer, {});
// console.log(io);
