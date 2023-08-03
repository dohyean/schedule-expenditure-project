// 로그인 페이지 password 확인
const Sql_select = require("../../Query_module/Sql_select.js");

exports.login_check = async function (db, io, pw) {
  var receive_PW_type = await Sql_select.sql_select(
    db,
    "login_data",
    "log_pw",
    "WHERE log_pw = ?",
    pw
  );
  return new Promise((resolve, reject) => {
    io.emit("Receive Login PW Check", { PW_check: receive_PW_type });
    resolve(receive_PW_type);
  });
};
