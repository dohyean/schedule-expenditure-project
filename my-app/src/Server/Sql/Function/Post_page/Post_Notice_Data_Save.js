// 공지사항 데이터 저장
const Sql_insert = require("../../Query_module/Sql_insert.js");

// 공지사항 데이터 저장
async function notice_data(db, data) {
  var dataset = [];
  dataset[0] = data.id;
  dataset[1] = data.name;
  dataset[2] = data.date;
  dataset[3] = data.title;
  dataset[4] = data.content;
  var column = [];
  column[0] = "note_id";
  column[1] = "note_name";
  column[2] = "note_date";
  column[3] = "note_title";
  column[4] = "note_content";

  var receive_type = await Sql_insert.sql_insert(
    db,
    "notice_data",
    column,
    dataset
  );

  return new Promise((resolve, reject) => {
    resolve(receive_type);
  });
}

exports.notice_data_save = async function (db, io, item) {
  var user = await notice_data(db, item);
  io.emit("Receive Notice Data Save", { save_data: user });
};
