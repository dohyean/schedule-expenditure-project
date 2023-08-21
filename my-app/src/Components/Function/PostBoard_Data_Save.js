// 공지사항 데이터 10개 저장
exports.Send_Notice_Five_Data = function (socket, cur_num) {
  return new Promise((resolve, reject) => {
    socket.emit("Send Notice Ten Data Save", {
      cur_num: cur_num,
    });
    resolve(0);
  });
};
exports.Rec_Notice_Five_Data = function (socket) {
  return new Promise((resolve, reject) => {
    socket.on("Receive Notice Ten Data Save", (message) => {
      resolve(message);
    });
  });
};

// 불만사항 데이터 10개 저장
exports.Send_Complaint_Five_Data = function (socket, cur_num) {
  return new Promise((resolve, reject) => {
    socket.emit("Send Complaint Ten Data Save", {
      cur_num: cur_num,
    });
    resolve(0);
  });
};
exports.Rec_Complaint_Five_Data = function (socket) {
  return new Promise((resolve, reject) => {
    socket.on("Receive Complaint Ten Data Save", (message) => {
      resolve(message);
    });
  });
};
