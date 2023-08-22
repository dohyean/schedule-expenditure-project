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

// PostFunc 관련
const User_Name = require("./Sql/Function/Post_page/Post_User_Name.js");
const Notice_Data_Save = require("./Sql/Function/Post_page/Post_Notice_Data_Save.js");
const Complaint_Data_Save = require("./Sql/Function/Post_page/Post_Complaint_Data_Save.js");
async function Ftn_Notice_Data(db, io, item) {
  Notice_Data_Save.notice_data_save(db, io, item);
}
async function Ftn_Complaint_Data(db, io, item) {
  Complaint_Data_Save.complaint_data_save(db, io, item);
}
async function Ftn_User_Name(db, io, item) {
  User_Name.user_name(db, io, item.id);
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

  // PostFunc 관련
  socket.on("Send Notice Data Save", (item) => {
    Ftn_Notice_Data(db, io, item.notice_data); // 공지사항 데이터 저장
  });
  socket.on("Send Complaint Data Save", (item) => {
    Ftn_Complaint_Data(db, io, item.complaint_data); // 불만사항 데이터 저장
  });
  socket.on("Send User Name Check", (item) => {
    Ftn_User_Name(db, io, item); // 유저 이름 반환
  });

  // PostBoard 관련
  const User_Five_Data = require("./Sql/Function/Post_page/Post_User_Data_Send.js");
  socket.on("Send Notice Ten Data Save", (item) => {
    User_Five_Data.ftn_user_notice_data(db, io, item); // 공지사항 데이터
  });
  socket.on("Send Complaint Ten Data Save", (item) => {
    User_Five_Data.ftn_user_complaint_data(db, io, item); // 불만사항 데이터
  });
  const Notice_Max_Num = require("./Sql/Function/Post_page/Post_Max_Num.js");
  socket.on("Send Notice Max Num", (item) => {
    Notice_Max_Num.ftn_notice_max_num(db, io); // 공지사항 최대 번호
  });
  socket.on("Send Complaint Max Num", (item) => {
    Notice_Max_Num.ftn_complaint_max_num(db, io); // 불만사항 최대 번호
  });
  const User_Data_Delete = require("./Sql/Function/Post_page/Post_User_Data_Delete.js");
  socket.on("Send Notice Data Delete", (item) => {
    User_Data_Delete.ftn_notice_data_delete(db, io, item.del_data); // 공지사항 데이터 삭제
  });
  socket.on("Send Complaint Data Delete", (item) => {
    User_Data_Delete.ftn_complaint_data_delete(db, io, item.del_data); // 불만사항 데이터 삭제
  });
  const User_Data_Update = require("./Sql/Function/Post_page/Post_User_Data_Update.js");
  socket.on("Send Notice Data Update", (item) => {
    User_Data_Update.ftn_user_notice_data_update(db, io, item);
  });
  socket.on("Send Complaint Data Update", (item) => {
    User_Data_Update.ftn_user_complaint_data_update(db, io, item);
  });
  // 서버 연결 종료
  socket.on("disconnect", function () {
    Close_dbms.close_dbms(db);
  });
});
