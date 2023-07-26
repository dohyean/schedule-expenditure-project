// server는 추가적으로 다른 위치에 생성후 사용할 예정
const express = require("express");
const app = express();
const port = 3001;
var http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
var Login = require("../sql/Login_message.js");

io.on("connection", (socket) => {
  socket.on("send message", (item) => {
    const message =
      "id : " + item.name + "//  message : " + item.msg + " // " + item.role;
    console.log(message);
    io.emit("receive message", {
      name: item.name,
      msg: item.msg,
      role: item.role,
    });
  });
  socket.on("login message", (item) => {
    Login.Login_message(item.id, item.pw);
  });

  socket.on("disconnect", function () {
    console.log("user disconnected: ", socket.id);
  });
});

http.listen(port, () => {
  console.log(`app listening on port : ${port}`);
});
