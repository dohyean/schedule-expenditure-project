exports.message_rec = function (db, io, id) {
  return new Promise((resolve, reject) => {
    const where_data = [];
    where_data.push(`${id}`);
    var sqlQuery = `SELECT user_id FROM user_data WHERE user_id = ?`;
    var receive_type = 4;
    db.all(sqlQuery, where_data, (err, result) => {
      if (err) {
        receive_type = 0;
      } else {
        if (result[0] === undefined) {
          receive_type = 1;
        } else {
          receive_type = 2;
        }
      }
      io.emit("receive message", { Duplicate: receive_type });
      resolve(receive_type);
    });
  });
};
