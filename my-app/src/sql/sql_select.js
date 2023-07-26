exports.sql_select = function (db, schema, column, where, where_data) {
  var insert_column = "";
  column.forEach((i) => {
    insert_column += i + ", ";
  });

  console.log(where);
  console.log(where_data);

  var sqlQuery = `SELECT ${insert_column.slice(0, -2)} 
                  FROM ${schema} 
                  ${where}`;
  db.all(sqlQuery, where_data, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
};
