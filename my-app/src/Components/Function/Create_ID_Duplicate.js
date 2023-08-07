// 서버 메세지 송신
exports.Send_Duplicate = function (socket, id) {
  return new Promise((resolve, reject) => {
    socket.emit("Send Duplicate Check", {
      id: id,
    });
    resolve(0);
  });
};

// 서버 메세지 수신
exports.Rec_Duplicate = function (socket) {
  return new Promise((resolve, reject) => {
    socket.on("Receive Duplicate Check", (message) => {
      resolve(message.Duplicate);
    });
  });
};
