// sql update 문법을 사용할 수 있게 만들 예정
// 필요한 데이터 : schema name, data set 등

exports.sql_update = function (db, schema, column, where, where_data) {
  var sqlQuery = `UPDATE ${schema} SET ${column} ${where};`;
  db.run(sqlQuery, where_data, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
};
