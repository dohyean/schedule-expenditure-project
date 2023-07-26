var Open_dbms = require("./open_dbms.js");
var Close_dbms = require("./close_dbms.js");
var Sql_select = require("./sql_select.js");

// 로그인 모듈
exports.Login_message = function (id, pw) {
  var message = id + " " + pw;
  console.log(message);

  var db = Open_dbms.open_dbms();

  Sql_select.sql_select(db, "user_data");

  Close_dbms.close_dbms(db);
};
