// 서버 메세지 송신
exports.Send_Find_PW = function (socket, pw) {
  return new Promise((resolve, reject) => {
    socket.emit("Send Find PW Check", {
      id: pw.id,
      phone: pw.phone,
    });
    resolve(0);
  });
};

// 서버 메세지 수신
exports.Rec_Find_PW = function (socket) {
  return new Promise((resolve, reject) => {
    socket.on("Receive Find PW Check", (message) => {
      resolve(message);
    });
  });
};
