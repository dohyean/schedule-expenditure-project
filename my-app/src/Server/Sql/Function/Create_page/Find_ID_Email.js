// 아이디 중복 확인
const Sql_select = require("../../Query_module/Sql_select.js");

async function find_id_email(db, io, email) {
  var receive_type = await Sql_select.sql_select(
    db,
    "user_data",
    "user_id",
    "WHERE user_email = ?",
    email
  );

  var send_rec_type = 0;
  if (receive_type === "err") {
    send_rec_type = 0;
  } else if (receive_type === "") {
    send_rec_type = 1;
  } else {
    send_rec_type = 2;
    receive_type = receive_type.user_id;
  }

  return new Promise((resolve, reject) => {
    io.emit("Receive Find ID Check", { ID: receive_type, num: send_rec_type });
  });
}

exports.ftn_find_id_email = async function (db, io, item) {
  await find_id_email(db, io, item.email);
};
