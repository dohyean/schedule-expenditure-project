// 로그인 페이지 id 확인
const Sql_select = require("../../Query_module/Sql_select.js");

async function login_check(db, io, id) {
  var receive_type = await Sql_select.sql_select(
    db,
    "login_data",
    "log_id",
    "WHERE log_id = ?",
    id
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
    io.emit("Receive Login ID Check", { num: send_rec_type });
  });
}

exports.ftn_login_check = async function (db, io, id) {
  await login_check(db, io, id);
};
