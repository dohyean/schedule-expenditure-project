// 아이디 확인
exports.Send_Login_ID = function (socket, id) {
  return new Promise((resolve, reject) => {
    socket.emit("Send Login ID Check", {
      id: id,
    });
    resolve(0);
  });
};
exports.Rec_Login_ID = function (socket) {
  return new Promise((resolve, reject) => {
    socket.on("Receive Login ID Check", (message) => {
      resolve(message.num);
    });
  });
};

// 패스워드 확인
exports.Send_Login_PW = function (socket, pw) {
  return new Promise((resolve, reject) => {
    socket.emit("Send Login PW Check", {
      pw: pw,
    });
    resolve(0);
  });
};
exports.Rec_Login_PW = function (socket) {
  return new Promise((resolve, reject) => {
    socket.on("Receive Login PW Check", (message) => {
      resolve(message.num);
    });
  });
};
