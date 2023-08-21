// sql update 문법을 사용할 수 있게 만들 예정
// 필요한 데이터 : schema name, data set 등

exports.sql_update = function (db, schema, column, where, where_data) {
  return new Promise((resolve, rejects) => {
    var sqlQuery = `UPDATE ${schema} SET ${column} ${where};`;
    console.log(sqlQuery);
    db.all(sqlQuery, where_data, (err, result) => {
      if (err) {
        resolve(0);
      } else {
        resolve(1);
      }
    });
  });
};
