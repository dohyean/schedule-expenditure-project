// 서버
const express = require("express");
const app = express();
const port = 3001;
const http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const Open_dbms = require("./Sql/Function/Tmp_page/Open_dbms.js");
const Close_dbms = require("./Sql/Function/Tmp_page/Close_dbms.js");

http.listen(port, () => {
  console.log(`app listening on port : ${port}`);
});

// 회원가입 중복 확인
const Duplicate_check = require("./Sql/Function/Create_page/Dpulicate_check.js");
async function Ftn_Duplicate_check(db, io, item) {
  await Duplicate_check.duplicate_chck(db, io, item.id);
}

// 로그인 ID, PW 확인
const Login_ID_check = require("./Sql/Function/Create_page/Login_ID_check.js");
const Login_PW_check = require("./Sql/Function/Create_page/Login_PW_check.js");
async function Ftn_Login_check(db, io, item, id_pw) {
  if (id_pw === 0) {
    await Login_ID_check.login_check(db, io, item.id);
  } else {
    await Login_PW_check.login_check(db, io, item.pw);
  }
}

io.on("connection", (socket) => {
  const db = Open_dbms.open_dbms();

  // 회원가입
  socket.on("Send Duplicate Check", (item) => {
    Ftn_Duplicate_check(db, io, item);
  });

  // 로그인
  socket.on("Send Login ID Check", (item) => {
    Ftn_Login_check(db, io, item, 0);
  });
  socket.on("Send Login PW Check", (item) => {
    Ftn_Login_check(db, io, item, 1);
  });

  socket.on("disconnect", function () {
    Close_dbms.close_dbms(db);
  });
});
