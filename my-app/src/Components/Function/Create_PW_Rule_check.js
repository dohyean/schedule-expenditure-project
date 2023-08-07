// 패스워드 규칙 확인
exports.PW_Rule_check = function (PW) {
  if (PW.length >= 8 && PW.length <= 16) {
    var number = 0;
    var special = 0;
    var alphabet = 0;
    for (let i = 0; i < PW.length; i++) {
      if (PW[i] >= "a" && PW[i] < "z") {
        alphabet++;
      } else if (PW[i] >= "A" && PW[i] <= "Z") {
        alphabet++;
      } else if (PW[i] >= "0" && PW[i] <= "9") {
        number++;
      } else {
        special++;
      }
    }
    if (number !== 0 && special !== 0 && alphabet !== 0) {
      return 0; // 올바른 패스워드
    } else {
      return 1; // 올바르지 않는 패스워드
    }
  } else {
    return 1; // 패스워드가 짧거나 길음
  }
};
