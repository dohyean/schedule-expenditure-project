// 불만사항 데이터 저장
const Sql_insert = require("../../Query_module/Sql_insert.js");
const Sql_update = require("../../Query_module/Sql_update.js");

// 불만사항 데이터 저장
async function complaint_data_save(db, io, data) {
  await Sql_update.sql_update(
    db,
    "complaint_data",
    "complaint_order = complaint_order + 1",
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
  column[0] = "complaint_order";
  column[1] = "complaint_id";
  column[2] = "complaint_name";
  column[3] = "complaint_date";
  column[4] = "complaint_title";
  column[5] = "complaint_content";

  var receive_type = await Sql_insert.sql_insert(
    db,
    "complaint_data",
    column,
    dataset
  );

  console.log(receive_type);

  return new Promise((resolve, reject) => {
    io.emit("Receive Complaint Data Save", { save_data: receive_type });
  });
}

exports.ftn_complaint_data_save = async function (db, io, item) {
  await complaint_data_save(db, io, item);
};
