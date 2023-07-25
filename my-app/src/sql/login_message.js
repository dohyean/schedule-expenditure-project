var Open_dbms = require("./open_dbms.js");
var Close_dbms = require("./close_dbms.js");

// 로그인 모듈
exports.Login_message = function (id, pw) {
  var message = id + " " + pw;
  console.log(message);

  var db = Open_dbms.open_dbms();

  var sqlQuery = "select * from user_data";
  db.all(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });

  Close_dbms.close_dbms(db);
};
