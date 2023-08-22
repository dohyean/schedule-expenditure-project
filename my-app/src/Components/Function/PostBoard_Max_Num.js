// 저장된 공지사항 최댓값 반환
exports.Send_Notice_Max_Num = function (socket) {
  return new Promise((resolve, reject) => {
    socket.emit("Send Notice Max Num", {});
    resolve(0);
  });
};
exports.Rec_Notice_Max_Num = function (socket) {
  return new Promise((resolve, reject) => {
    socket.on("Receive Notice Max Num", (message) => {
      resolve(message);
    });
  });
};

// 저장된 불만사항 최댓값 반환
exports.Send_Complaint_Max_Num = function (socket) {
  return new Promise((resolve, reject) => {
    socket.emit("Send Complaint Max Num", {});
    resolve(0);
  });
};
exports.Rec_Complaint_Max_Num = function (socket) {
  return new Promise((resolve, reject) => {
    socket.on("Receive Complaint Max Num", (message) => {
      resolve(message);
    });
  });
};
