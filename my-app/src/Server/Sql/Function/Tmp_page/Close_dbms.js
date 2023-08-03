// 데이터베이스 종료 모듈
exports.close_dbms = function (db) {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Close the database connection.");
    }
  });
};
