// 아이디 중복 확인
const Sql_select = require("../../Query_module/Sql_select.js");

async function duplicate_chck(db, io, id) {
  var receive_type = await Sql_select.sql_select(
    db,
    "user_data",
    "user_id",
    "WHERE user_id = ?",
    id
  );
  var send_rec_type = 0;
  if (receive_type === "err") {
    send_rec_type = 0;
  } else {
    if (receive_type === "") {
      send_rec_type = 1;
    } else {
      send_rec_type = 2;
    }
  }
  return new Promise((resolve, reject) => {
    io.emit("Receive Duplicate Check", { Duplicate: send_rec_type });
  });
}

exports.ftn_duplicate_check = async function (db, io, item) {
  await duplicate_chck(db, io, item.id);
};
