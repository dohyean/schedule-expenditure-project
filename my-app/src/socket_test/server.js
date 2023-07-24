const express = require("express");
const app = express();
const port = 3001; //포트 번호 3001
var http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("send message", (item) => {
    //"send message"라는 이벤트 받음 (1)
    const message =
      "id : " + item.name + "//  message : " + item.msg + " // " + item.role;
    console.log(message);
    io.emit("receive message", {
      name: item.name,
      msg: item.msg,
      role: item.role,
    }); //"receive message"라는 이벤트 발생
  });
  socket.on("disconnect", function () {
    console.log("user disconnected: ", socket.id);
  });
});
http.listen(port, () => {
  console.log(`app listening on port : ${port}`);
});
