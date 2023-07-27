var Open_dbms = require("./Open_dbms.js");
var Close_dbms = require("./Close_dbms.js");
var Sql_select = require("./Sql_select.js");

// 로그인 모듈
exports.Login_message = function (id, pw) {
  var message = id + " " + pw;
  console.log(message);

  var db = Open_dbms.open_dbms();

  var use = [];
  use[0] = "*";
  Sql_select.sql_select(db, "user_data", use);
  var tt = [];
  tt[0] = "user_id";
  Sql_select.sql_select(db, "user_data", tt);

  Close_dbms.close_dbms(db);
};
