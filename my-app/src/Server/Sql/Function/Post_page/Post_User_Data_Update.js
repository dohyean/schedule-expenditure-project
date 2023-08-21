const Sql_update = require("../../Query_module/Sql_update.js");
// 공지사항 데이터 반환
function user_notice_data_update(db, io, data) {
  var update_where = [];
  update_where[0] = data.id;
  update_where[1] = data.date;
  update_where[2] = data.origin_title;
  update_where[3] = data.origin_content;
  var receive_type = Sql_update.sql_update(
    db,
    "notice_data",
    `note_title = ${data.title}, note_content = ${data.content}`,
    "WHERE note_id = ? AND note_date = ? AND note_title = ? AND note_content = ?",
    update_where
  );
  return new Promise((resolve, reject) => {
    io.emit("Receive Notice Data Update", { user_data: receive_type });
  });
}
exports.ftn_user_notice_data_update = async function (db, io, item) {
  await user_notice_data_update(db, io, item.notice_data);
};

// 불만사항 데이터 반환
async function user_complaint_data_update(db, io, data) {
  var update_where = [];
  update_where[0] = data.id;
  update_where[1] = data.date;
  update_where[2] = data.origin_title;
  update_where[3] = data.origin_content;
  var receive_type = await Sql_update.sql_update(
    db,
    "complaint_data",
    `complaint_title = '${data.title}', complaint_content = '${data.content}'`,
    "WHERE complaint_id = ? AND complaint_date = ? AND complaint_title = ? AND complaint_content = ?",
    update_where
  );
  console.log(receive_type);
  return new Promise((resolve, reject) => {
    io.emit("Receive Complaint Data Update", { user_data: receive_type });
  });
}
exports.ftn_user_complaint_data_update = async function (db, io, item) {
  await user_complaint_data_update(db, io, item.complaint_data);
};
