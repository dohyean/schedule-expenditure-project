// 공지사항 데이터 전송
exports.Send_Notice_Data = function (socket, pw) {
  return new Promise((resolve, reject) => {
    socket.emit("Send Login PW Check", {
      pw: pw,
    });
    resolve(0);
  });
};
exports.Rec_Notice_Data = function (socket) {
  return new Promise((resolve, reject) => {
    socket.on("Receive Login PW Check", (message) => {
      resolve(message.num);
    });
  });
};

// 불만사항 데이터 전송
