var Open_dbms = require("./function/Open_dbms.js");
var Close_dbms = require("./Close_dbms.js");
var Sql_select = require("./Sql_select.js");
var Sql_insert = require("./Sql_insert.js");
var Sql_delete = require("./Query_module/Sql_delete.js");
var Sql_update = require("./Sql_update.js");

// 로그인 모듈
exports.Login_message = function (id, pw) {
  var message = id + " " + pw;
  console.log(message);

  var db = Open_dbms.open_dbms();

  // 아래는 사용하는 방법에 대해 각 구문별로 나타냄

  // INSERT 구문
  // var dataset = [];
  // dataset[0] = "1";
  // dataset[1] = "2";
  // dataset[2] = "3";
  // dataset[3] = "4";
  // dataset[4] = "5";
  // var column = [];
  // column[0] = "user_id";
  // column[1] = "user_phone";
  // column[2] = "user_email";
  // column[3] = "user_name";
  // column[4] = "user_SSN";
  // Sql_insert.sql_insert(db, "user_data", column, dataset);

  // SELECT 구문
  var use = [];
  use[0] = "*";
  var where_data = [];
  where_data[0] = "what";
  Sql_select.sql_select(db, "user_data", use, "WHERE user_id = ?", where_data);
  Sql_select.sql_select(db, "user_data", use);

  // UPDATE 구문
  var up_where = [];
  up_where[0] = "1";
  Sql_update.sql_update(
    db,
    "user_data",
    'user_phone = "what the"',
    "WHERE user_id = ?",
    up_where
  );

  Sql_select.sql_select(db, "user_data", use);

  // DELETE 구문
  // var del = [];
  // del[0] = "what";
  // Sql_delete.sql_delete(db, "user_data", "WHERE user_id = ?", del);

  Close_dbms.close_dbms(db);
};
