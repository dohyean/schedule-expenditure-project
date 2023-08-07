// 데이터베이스 시작 모듈
const sqlite3 = require("sqlite3").verbose();

exports.open_dbms = function () {
  var db = new sqlite3.Database("./db_control.db", (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the chinook database.");
  });
  return db;
};
