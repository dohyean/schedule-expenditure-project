const Sql_delete = require("../../Query_module/Sql_delete.js");
const Sql_update = require("../../Query_module/Sql_update.js");
// 공지사항 데이터 삭제
exports.ftn_notice_data_delete = async function (db, io, item) {
  var del = [];
  del[0] = item.order;
  del[1] = item.id;
  del[2] = item.date;
  del[3] = item.title;
  del[4] = item.content;
  var receive_type = await Sql_delete.sql_delete(
    db,
    "notice_data",
    "WHERE note_order = ? AND note_id = ? AND note_date = ? AND note_title = ? AND note_content = ?",
    del
  );

  if (receive_type !== 0) {
    receive_type = await Sql_update.sql_update(
      db,
      "notice_data",
      "note_order = note_order - 1",
      `WHERE note_order > ${item.order}`
    );
  }

  return new Promise((resolve, reject) => {
    io.emit("Receive Notice Data Delete", { del_success: receive_type });
  });
};

// 불만사항 데이터 삭제
exports.ftn_complaint_data_delete = async function (db, io, item) {
  var del = [];
  del[0] = item.order;
  del[1] = item.id;
  del[2] = item.date;
  del[3] = item.title;
  del[4] = item.content;
  var receive_type = await Sql_delete.sql_delete(
    db,
    "complaint_data",
    "WHERE complaint_order = ? AND complaint_id = ? AND complaint_date = ? AND complaint_title = ? AND complaint_content = ?",
    del
  );

  if (receive_type !== 0) {
    receive_type = await Sql_update.sql_update(
      db,
      "complaint_data",
      "complaint_order = complaint_order - 1",
      `WHERE complaint_order > ${item.order}`
    );
  }
  return new Promise((resolve, reject) => {
    io.emit("Receive Complaint Data Delete", { del_success: receive_type });
  });
};
