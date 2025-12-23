// console.log(io);
console.log("running ?");

//io() connectes to the socket.io server at the url
const socket = io("http://localhost:3000");

//out socket has an on method
// and an emit method

socket.on("welcome", (data) => {
  console.log("data", data);
  // once welcom is emitted from the server, we run this callback
  // socket.emit("thankYou", [4, 5, 6]);
});

const inputBtn = document.querySelector(".btn-primary");

const sendMessage = (e) => {
  e.preventDefault();
  const input = document.querySelector("#user-message");
  console.log(input.value);
  socket.emit("thankYou", input.value);
};

inputBtn.addEventListener("click", sendMessage);
