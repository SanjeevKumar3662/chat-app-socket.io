// console.log(io);
console.log("running ?");

//io() connectes to the socket.io server at the url
const socket = io("http://localhost:3000");

//out socket has an on method
// and an emit method

socket.on("welcome", (data) => {
  const messages = document.querySelector("#messages");
  // console.log(messages);

  const li = document.createElement("li");
  li.innerText = `${data.id}: ${data.message}`;

  messages.appendChild(li);
  // once welcom is emitted from the server, we run this callback
  // socket.emit("thankYou", [4, 5, 6]);
});

const inputBtn = document.querySelector(".btn-primary");

const sendMessage = (e) => {
  e.preventDefault();
  const input = document.querySelector("#user-message");
  socket.emit("toServer", input.value);
  input.value = "";
};

inputBtn.addEventListener("click", sendMessage);
