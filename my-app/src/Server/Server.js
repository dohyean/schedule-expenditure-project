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

io.on("connection", (socket) => {
  // 서버 연결
  const db = Open_dbms.open_dbms();

  // 회원가입
  socket.on("Send Duplicate Check", (item) => {
    const Duplicate_Check = require("./Sql/Function/Create_page/Create_Duplicate_check.js");
    Duplicate_Check.ftn_duplicate_check(db, io, item); // 회원가입 중복 확인
  });
  socket.on("Send User Data Save", (item) => {
    const Create_User_data = require("./Sql/Function/Create_page/Create_User_Data.js");
    Create_User_data.ftn_user_data_save(db, io, item); // 회원가입 유저 데이터 저장
  });

  // 아이디 찾기
  socket.on("Send Find ID Check", (item) => {
    const Find_ID_Email = require("./Sql/Function/Create_page/Find_ID_Email.js");
    Find_ID_Email.ftn_find_id_email(db, item);
  });

  // 비밀번호 찾기
  socket.on("Send Find PW Check", (item) => {
    const Find_PW_ID_Phone = require("./Sql/Function/Create_page/Find_PW_ID_Phone.js");
    Find_PW_ID_Phone.ftn_find_pw_id_phone(db, io, item);
  });

  // 로그인
  socket.on("Send Login ID Check", (item) => {
    const Login_ID_check = require("./Sql/Function/Create_page/Login_ID_check.js");
    Login_ID_check.ftn_login_check(db, io, item.id); // 아이디 확인
  });
  socket.on("Send Login PW Check", (item) => {
    const Login_PW_check = require("./Sql/Function/Create_page/Login_PW_check.js");
    Login_PW_check.ftn_login_check(db, io, item.pw); // 패스워드 확인
  });

  // PostFunc 관련
  socket.on("Send Notice Data Save", (item) => {
    const Notice_Data_Save = require("./Sql/Function/Post_page/Post_Notice_Data_Save.js");
    Notice_Data_Save.ftn_notice_data_save(db, io, item.notice_data); // 공지사항 데이터 저장
  });
  socket.on("Send Complaint Data Save", (item) => {
    const Complaint_Data_Save = require("./Sql/Function/Post_page/Post_Complaint_Data_Save.js");
    Complaint_Data_Save.ftn_complaint_data_save(db, io, item.complaint_data); // 불만사항 데이터 저장
  });
  socket.on("Send User Name Check", (item) => {
    const User_Name = require("./Sql/Function/Post_page/Post_User_Name.js");
    User_Name.ftn_user_name(db, io, item); // 유저 이름 반환
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
