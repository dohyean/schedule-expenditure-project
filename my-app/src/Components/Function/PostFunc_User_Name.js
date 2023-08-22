// 유저 이름 받아오기
exports.Send_User_Name = function (socket, id) {
  return new Promise((resolve, reject) => {
    socket.emit("Send User Name Check", {
      id: id,
    });
    resolve(0);
  });
};
exports.Rec_User_Name = function (socket) {
  return new Promise((resolve, reject) => {
    socket.on("Receive User Name Check", (message) => {
      resolve(message.name);
    });
  });
};
