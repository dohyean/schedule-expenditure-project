exports.sql_delete = function (db, schema, where, where_data) {
  return new Promise((resolve, rejects) => {
    var sqlQuery = `DELETE FROM ${schema} ${where}`;
    db.all(sqlQuery, where_data, (err, result) => {
      if (err) {
        resolve(0);
      } else {
        resolve(1);
      }
    });
  });
};
