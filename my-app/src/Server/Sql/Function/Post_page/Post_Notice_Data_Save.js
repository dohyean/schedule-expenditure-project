// 공지사항 데이터 저장
const Sql_insert = require("../../Query_module/Sql_insert.js");
const Sql_update = require("../../Query_module/Sql_update.js");

// 공지사항 데이터 저장
async function notice_data_save(db, io, data) {
  await Sql_update.sql_update(
    db,
    "notice_data",
    "note_order = note_order + 1",
    ""
  );

  var dataset = [];
  dataset[0] = 1;
  dataset[1] = data.id;
  dataset[2] = data.name;
  dataset[3] = data.date;
  dataset[4] = data.title;
  dataset[5] = data.content;
  var column = [];
  column[0] = "note_order";
  column[1] = "note_id";
  column[2] = "note_name";
  column[3] = "note_date";
  column[4] = "note_title";
  column[5] = "note_content";

  var receive_type = await Sql_insert.sql_insert(
    db,
    "notice_data",
    column,
    dataset
  );

  return new Promise((resolve, reject) => {
    io.emit("Receive Notice Data Save", { save_data: receive_type });
  });
}

exports.ftn_notice_data_save = async function (db, io, item) {
  await notice_data_save(db, io, item);
};
