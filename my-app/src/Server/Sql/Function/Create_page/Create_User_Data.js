// 유저 데이터 저장 및 실패시 삭제
const Sql_insert = require("../../Query_module/Sql_insert.js");
const Sql_delete = require("../../Query_module/Sql_delete.js");

// user_data에 각종 데이터 저장
async function user_data_save(db, data) {
  var dataset = [];
  dataset[0] = data.id;
  dataset[1] = data.phone;
  dataset[2] = data.email;
  dataset[3] = data.name;
  dataset[4] = data.SSN;
  var column = [];
  column[0] = "user_id";
  column[1] = "user_phone";
  column[2] = "user_email";
  column[3] = "user_name";
  column[4] = "user_SSN";

  var receive_type = await Sql_insert.sql_insert(
    db,
    "user_data",
    column,
    dataset
  );

  return new Promise((resolve, reject) => {
    resolve(receive_type);
  });
}

// login_data에 id, pw 저장
async function login_data_save(db, data) {
  var dataset = [];
  dataset[0] = data.id;
  dataset[1] = data.pw;
  var column = [];
  column[0] = "log_id";
  column[1] = "log_pw";

  var receive_type = await Sql_insert.sql_insert(
    db,
    "login_data",
    column,
    dataset
  );

  return new Promise((resolve, reject) => {
    resolve(receive_type);
  });
}

// 데이터 저장 실패시
async function user_data_del(db, id) {
  Sql_delete.sql_delete(db, "user_data", "WHERE user_id = ?", id);
}

exports.ftn_user_data_save = async function (db, io, item) {
  var user = await user_data_save(db, item);
  if (user === 0) {
    io.emit("Receive User Data Save", { User_save: user });
  } else {
    var login = await login_data_save(db, item);
    if (login === 0) {
      var del = await user_data_del(db, item.id);
      console.log("check " + del);
    }
    io.emit("Receive User Data Save", { User_save: login });
  }
};
