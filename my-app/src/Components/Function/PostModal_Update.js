// 공지사항 데이터 전송
exports.Send_Notice_Data_Update = function (socket, notice_data) {
  return new Promise((resolve, reject) => {
    socket.emit("Send Notice Data Update", {
      notice_data: notice_data,
    });
    resolve(0);
  });
};
exports.Rec_Notice_Data_Update = function (socket) {
  return new Promise((resolve, reject) => {
    socket.on("Receive Notice Data Update", (message) => {
      resolve(message.user_data);
    });
  });
};

// 불만사항 데이터 전송
exports.Send_Complaint_Data_Update = function (socket, complaint_data) {
  return new Promise((resolve, reject) => {
    socket.emit("Send Complaint Data Update", {
      complaint_data: complaint_data,
    });
    resolve(0);
  });
};
exports.Rec_Complaint_Data_Update = function (socket) {
  return new Promise((resolve, reject) => {
    socket.on("Receive Complaint Data Update", (message) => {
      resolve(message.user_data);
    });
  });
};
