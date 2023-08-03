var Sql_select = require("../sql/Sql_select.js");

exports.message_rec = async function (db, io, id) {
  const where_data = [];
  where_data.push(`${id}`);
  // var sqlQuery = `SELECT user_id FROM user_data WHERE user_id = ?`;
  var receive_type = await Sql_select.sql_select(
    db,
    "user_data",
    "user_id",
    "WHERE user_id = ?",
    where_data
  );
  // db.all(sqlQuery, where_data, (err, result) => {
  //   if (err) {
  //     receive_type = 0;
  //   } else {
  //     if (result[0] === undefined) {
  //       receive_type = 1;
  //     } else {
  //       receive_type = 2;
  //     }
  //   }
  console.log(receive_type);
  return new Promise((resolve, reject) => {
    io.emit("receive message", { Duplicate: receive_type });
    resolve(receive_type);
    // });
  });
};
