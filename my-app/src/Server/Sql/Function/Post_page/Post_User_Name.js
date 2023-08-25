// 유저 이름 반환
const Sql_select = require("../../Query_module/Sql_select.js");

async function user_name(db, io, id) {
  var receive_type = await Sql_select.sql_select(
    db,
    "user_data",
    "user_name",
    "WHERE user_id = ?",
    id
  );
  if (receive_type === "err") {
  } else if (receive_type === "") {
  } else {
    receive_type = receive_type.user_name;
  }

  return new Promise((resolve, reject) => {
    io.emit("Receive User Name Check", { name: receive_type });
  });
}

exports.ftn_user_name = async function (db, io, item) {
  await user_name(db, io, item.id);
};
