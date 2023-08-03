const Sql_select = require("../../Query_module/Sql_select.js");

exports.duplicate_chck = async function (db, io, id) {
  var receive_type = await Sql_select.sql_select(
    db,
    "user_data",
    "user_id",
    "WHERE user_id = ?",
    id
  );
  return new Promise((resolve, reject) => {
    io.emit("Receive Duplicate Check", { Duplicate: receive_type });
    resolve(receive_type);
  });
};
