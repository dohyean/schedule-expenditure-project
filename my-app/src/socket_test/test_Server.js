// server는 추가적으로 다른 위치에 생성후 사용할 예정
const express = require("express");
const app = express();
const port = 3001;
var http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const Login = require("../sql/login_message.js");
const Open_dbms = require("../sql/Open_dbms.js");
const Close_dbms = require("../sql/Close_dbms.js");
const Sql_select = require("../sql/Sql_select.js");
const Message_rec = require("./Message_rec.js");

http.listen(port, () => {
  console.log(`app listening on port : ${port}`);
});

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

//
async function Duplicate_check(db, io, item) {
  await Message_rec.message_rec(db, io, item.id);
}

io.on("connection", (socket) => {
  const db = Open_dbms.open_dbms();

  socket.on("Send Duplicate Check", (item) => {
    Duplicate_check(db, io, item, socket);
  });

  socket.on("disconnect", function () {
    console.log("user disconnected: ", socket.id);
    Close_dbms.close_dbms(db);
  });
});
