// 공지사항 데이터 전송
exports.Send_Notice_Data = function (socket, notice_data) {
  return new Promise((resolve, reject) => {
    socket.emit("Send Notice Data Save", {
      notice_data: notice_data,
    });
    resolve(0);
  });
};
exports.Rec_Notice_Data = function (socket) {
  return new Promise((resolve, reject) => {
    socket.on("Receive Notice Data Save", (message) => {
      resolve(message.save_data);
    });
  });
};

// 불만사항 데이터 전송
exports.Send_Complaint_Data = function (socket, complaint_data) {
  return new Promise((resolve, reject) => {
    socket.emit("Send Complaint Data Save", {
      complaint_data: complaint_data,
    });
    resolve(0);
  });
};
exports.Rec_Complaint_Data = function (socket) {
  return new Promise((resolve, reject) => {
    socket.on("Receive Complaint Data Save", (message) => {
      resolve(message.save_data);
    });
  });
};
