// 공지사항 최댓값 반환
function notice_max_num(db, io) {
  return new Promise((resolve, reject) => {
    var sqlQuery = `SELECT count(*) as max_num FROM notice_data`;
    var receive_type = 4;
    var return_data = "";
    db.all(sqlQuery, (err, result) => {
      if (err) {
        receive_type = 0;
        return_data = "err";
      } else {
        receive_type = 1;
        return_data = result[0].max_num;
      }
      while (true) {
        if (receive_type !== 4) {
          io.emit("Receive Notice Max Num", { max_num: return_data });
          resolve(return_data);
          break;
        }
      }
    });
  });
}

exports.ftn_notice_max_num = async function (db, io) {
  await notice_max_num(db, io);
};

// 불만사항 최댓값 반환
function complaint_max_num(db, io) {
  return new Promise((resolve, reject) => {
    var sqlQuery = `SELECT count(*) as max_num FROM complaint_data`;
    var receive_type = 4;
    var return_data = "";
    db.all(sqlQuery, (err, result) => {
      if (err) {
        receive_type = 0;
        return_data = "err";
      } else {
        receive_type = 1;
        return_data = result[0].max_num;
      }
      while (true) {
        if (receive_type !== 4) {
          io.emit("Receive Complaint Max Num", { max_num: return_data });
          resolve(return_data);
          break;
        }
      }
    });
  });
}

exports.ftn_complaint_max_num = async function (db, io) {
  await complaint_max_num(db, io);
};
