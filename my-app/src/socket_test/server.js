// server는 추가적으로 다른 위치에 생성후 사용할 예정
const express = require("express");
const app = express();
const port = 3001;
var http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
var Login = require("../sql/login_message.js");
var Open_dbms = require("../sql/Open_dbms.js");
var Close_dbms = require("../sql/Close_dbms.js");
const Sql_select = require("../sql/Sql_select.js");
const Message_rec = require("./Message_rec.js");

// const socket = io();

http.listen(port, () => {
  console.log(`app listening on port : ${port}`);
});

// const chatForm = document.getElementById('chat-form');
// const chatBox = document.getElementById('messages');

// chatForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const message = e.target.m.value
//     socket.emit('chat message', message);
//     e.target.m.value = '';
// })

// socket.on('chat message', (message) => {
//     chatBox.appendChild(makeMessage(message));
// })

// const makeMessage = (message) => {
//     const msgBox = document.createElement('div');
//     msgBox.className = "message-wrapper";
//     msgBox.innerText = message;
//     return msgBox;
// }

// 우리가 사용할 서버 코드
// io.on("connection", (socket) => {
//   const db = Open_dbms.open_dbms();

//   socket.on("Send Duplicate Check", (item) => {
//     Message_rec.message_rec(db, io, item.id);
//   });

//   socket.on("disconnect", function () {
//     console.log("user disconnected: ", socket.id);
//     Close_dbms.close_dbms(db);
//   });
// });

// 테스트용 서버 코드

async function start(db, io, item, socket) {
  var type = await Message_rec.message_rec(db, io, item.id);
  console.log("server " + type);
}
io.on("connection", (socket) => {
  const db = Open_dbms.open_dbms();

  socket.on("Send Duplicate Check", (item) => {
    start(db, io, item, socket);
  });

  socket.on("disconnect", function () {
    console.log("user disconnected: ", socket.id);
    Close_dbms.close_dbms(db);
  });
});
