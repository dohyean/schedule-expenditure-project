// 로그인 페이지 id 확인
const Sql_select = require("../../Query_module/Sql_select.js");

exports.login_check = async function (db, io, id) {
  var receive_ID_type = await Sql_select.sql_select(
    db,
    "login_data",
    "log_id",
    "WHERE log_id = ?",
    id
  );
  return new Promise((resolve, reject) => {
    io.emit("Receive Login ID Check", { ID_check: receive_ID_type });
    resolve(receive_ID_type);
  });
};
