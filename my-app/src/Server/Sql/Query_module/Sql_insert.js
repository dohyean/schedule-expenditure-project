exports.sql_insert = function (db, schema, column, dataset) {
  return new Promise((resolve, rejects) => {
    var insert_column = "";
    var column_num = "";
    column.forEach((i) => {
      insert_column += i + ", ";
      column_num += "?, ";
    });

    var sqlQuery = `INSERT INTO ${schema}(${insert_column.slice(0, -2)}) 
                    VALUES (${column_num.slice(0, -2)})`;
    db.all(sqlQuery, dataset, (err, result) => {
      if (err) {
        resolve(0);
      } else {
        resolve(1);
      }
    });
  });
};
