// 로그인 페이지 password 확인
const Sql_select = require("../../Query_module/Sql_select.js");

exports.login_check = async function (db, io, pw) {
  var receive_type = await Sql_select.sql_select(
    db,
    "login_data",
    "log_pw",
    "WHERE log_pw = ?",
    pw
  );
  var send_rec_type = 0;
  if (receive_type === "err") {
    send_rec_type = 0;
  } else if (receive_type === "") {
    send_rec_type = 1;
  } else {
    send_rec_type = 2;
  }
  return new Promise((resolve, reject) => {
    io.emit("Receive Login PW Check", { num: send_rec_type });
    resolve(send_rec_type);
  });
};
