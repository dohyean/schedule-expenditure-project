// 공지사항 삭제
exports.Send_Notice_Data_Del = function (socket, del_data) {
  return new Promise((resolve, reject) => {
    socket.emit("Send Notice Data Delete", {
      del_data: del_data,
    });
    resolve(0);
  });
};
exports.Rec_Notice_Data_Del = function (socket) {
  return new Promise((resolve, reject) => {
    socket.on("Receive Notice Data Delete", (message) => {
      resolve(message.del_success);
    });
  });
};

// 불만사항 삭제
exports.Send_Complaint_Data_Del = function (socket, del_data) {
  return new Promise((resolve, reject) => {
    socket.emit("Send Complaint Data Delete", {
      del_data: del_data,
    });
    resolve(0);
  });
};
exports.Rec_Complaint_Data_Del = function (socket) {
  return new Promise((resolve, reject) => {
    socket.on("Receive Complaint Data Delete", (message) => {
      resolve(message.del_success);
    });
  });
};
