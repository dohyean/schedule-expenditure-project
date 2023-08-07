// 서버 메세지 송신
exports.Send_Find_ID = function (socket, email) {
  return new Promise((resolve, reject) => {
    socket.emit("Send Find ID Check", {
      email: email,
    });
    resolve(0);
  });
};

// 서버 메세지 수신
exports.Rec_Find_ID = function (socket) {
  return new Promise((resolve, reject) => {
    socket.on("Receive Find ID Check", (message) => {
      resolve(message);
    });
  });
};
