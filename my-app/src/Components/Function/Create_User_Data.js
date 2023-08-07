// 서버 메시지 송신
exports.Send_User_Data = function (socket, data) {
  return new Promise((resolve, reject) => {
    socket.emit("Send User Data Save", {
      id: data.id,
      pw: data.pw,
      name: data.name,
      phone: data.phone,
      SSN: data.SSN,
      email: data.email,
    });
    resolve(0);
  });
};

// 서버 메시지 수신
exports.Rec_User_Data = function (socket) {
  return new Promise((resolve, reject) => {
    socket.on("Receive User Data Save", (message) => {
      resolve(message);
    });
  });
};
