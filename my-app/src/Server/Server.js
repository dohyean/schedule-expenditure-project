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
const Duplicate_check = require("./Sql/Function/Create_page/Create_Duplicate_check.js");
async function Ftn_Duplicate_check(db, io, item) {
  await Duplicate_check.duplicate_chck(db, io, item.id);
}

// 회원가입 유저 데이터 저장
const Create_User_data = require("./Sql/Function/Create_page/Create_User_Data.js");
async function Ftn_User_Data_Save(db, io, item) {
  Create_User_data.ftn_user_data_save(db, io, item);
}

// 아이디 찾기
const Find_ID_Email = require("./Sql/Function/Create_page/Find_ID_Email.js");
async function Ftn_Find_ID(db, io, item) {
  Find_ID_Email.find_id_email(db, io, item.email);
}

// 비밀번호 찾기
const Find_PW_ID_Phone = require("./Sql/Function/Create_page/Find_PW_ID_Phone.js");
async function Ftn_Find_PW(db, io, item) {
  Find_PW_ID_Phone.find_pw_id_phone(db, io, item);
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
  // 서버 연결
  const db = Open_dbms.open_dbms();

  // 회원가입
  socket.on("Send Duplicate Check", (item) => {
    Ftn_Duplicate_check(db, io, item); // 중복 확인
  });
  socket.on("Send User Data Save", (item) => {
    Ftn_User_Data_Save(db, io, item); // 유저 데이터 저장
  });

  // 아이디 찾기
  socket.on("Send Find ID Check", (item) => {
    Ftn_Find_ID(db, io, item);
  });

  // 비밀번호 찾기
  socket.on("Send Find PW Check", (item) => {
    Ftn_Find_PW(db, io, item);
  });

  // 로그인
  socket.on("Send Login ID Check", (item) => {
    Ftn_Login_check(db, io, item, 0); // 아이디 확인
  });
  socket.on("Send Login PW Check", (item) => {
    Ftn_Login_check(db, io, item, 1); // 패스워드 확인
  });

  // 서버 연결 종료
  socket.on("disconnect", function () {
    Close_dbms.close_dbms(db);
  });
});
