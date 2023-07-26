// sql select 문법을 사용할 수 있게 만들 예정
// 필요한 데이터 : schema name, data set 등

exports.sql_select = function (db, database, dataset) {
  var column = "";
  dataset.forEach((i) => {
    column += i + ", ";
  });

  var sqlQuery = `select ${column.slice(0, -2)} from ${database}`;
  db.all(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
};
