exports.sql_delete = function (db, schema, where, where_data) {
  var sqlQuery = `DELETE FROM ${schema} ${where}`;
  db.all(sqlQuery, where_data, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
};
