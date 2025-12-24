import express from "express";

const app = express();

app.use(express.static("public"));

app.get("/", (_, res) => {
  res.sendFile("/index.html");
});

app.listen(3000, () => {
  console.log("Server is listening at PORT:3000");
});
