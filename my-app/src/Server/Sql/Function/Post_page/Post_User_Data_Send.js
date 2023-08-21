// 공지사항 데이터 반환
function user_notice_data(db, io, num) {
  return new Promise((resolve, reject) => {
    var sqlQuery = `SELECT * FROM notice_data 
                    WHERE note_order BETWEEN ${num} AND ${num + 9}`;
    var receive_type = 4;
    var return_data = "";
    db.all(sqlQuery, (err, result) => {
      if (err) {
        receive_type = 0;
        console.log(return_data);
        return_data = "err";
      } else {
        if (result[0] === undefined) {
          receive_type = 1;
          return_data = "";
        } else {
          receive_type = 2;
          return_data = result;
        }
      }
      while (true) {
        if (receive_type !== 4) {
          io.emit("Receive Notice Ten Data Save", { user_data: return_data });
          resolve(return_data);
          break;
        }
      }
    });
  });
}

exports.ftn_user_notice_data = async function (db, io, item) {
  await user_notice_data(db, io, item.cur_num);
};

// 불만사항 데이터 반환
function user_complaint_data(db, io, num) {
  return new Promise((resolve, reject) => {
    var sqlQuery = `SELECT * FROM complaint_data 
                    WHERE complaint_order BETWEEN ${num} AND ${num + 9}`;
    var receive_type = 4;
    var return_data = "";
    db.all(sqlQuery, (err, result) => {
      if (err) {
        receive_type = 0;
        return_data = "err";
      } else {
        if (result[0] === undefined) {
          receive_type = 1;
          return_data = "";
        } else {
          receive_type = 2;
          return_data = result;
        }
      }
      while (true) {
        if (receive_type !== 4) {
          io.emit("Receive Complaint Ten Data Save", {
            user_data: return_data,
          });
          resolve(return_data);
          break;
        }
      }
    });
  });
}

exports.ftn_user_complaint_data = async function (db, io, item) {
  await user_complaint_data(db, io, item.cur_num);
};
