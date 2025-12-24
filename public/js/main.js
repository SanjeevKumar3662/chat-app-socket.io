const chatForm = document.getElementById("chat-form");

//Get username and room from url
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
console.log(username, room);

const socket = io();

// Join Chatroom
socket.emit("joinRoom", { username, room });

socket.on("message", (data) => {
  console.log("New message received : ", data);
  outputMessage(data);
});

// Messge submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;
  // console.log(msg);
  socket.emit("chatMessage", msg);
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">${message.text}
  </p>
  `;

  document.querySelector(".chat-messages").appendChild(div);
}
