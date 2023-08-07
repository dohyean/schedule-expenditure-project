// 아이디 중복 확인
const Sql_select = require("../../Query_module/Sql_select.js");

exports.find_pw_id_phone = async function (db, io, pw) {
  var data = [];
  data[0] = pw.id;
  data[1] = pw.phone;
  var receive_type = await Sql_select.sql_select(
    db,
    "user_data",
    "user_id",
    "WHERE user_id = ? and user_phone = ?",
    data
  );
  var send_rec_type = 0;
  if (receive_type === "err") {
    send_rec_type = 0;
  } else if (receive_type === "") {
    send_rec_type = 1;
  } else {
    receive_type = await Sql_select.sql_select(
      db,
      "login_data",
      "log_pw",
      "WHERE log_id = ?",
      pw.id
    );
    if (receive_type === "err") {
      send_rec_type = 0;
    } else if (receive_type === "") {
      send_rec_type = 1;
    } else {
      send_rec_type = 2;
      receive_type = receive_type.log_pw;
    }
  }

  return new Promise((resolve, reject) => {
    io.emit("Receive Find PW Check", { PW: receive_type, num: send_rec_type });
    resolve(send_rec_type);
  });
};
