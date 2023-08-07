import "../Style/Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
const Login_ID_PW = require("./Function/Login_ID_PW.js");

function Login() {
  const [state, setState] = useState({
    id: "",
    pw: "",
  });
  const navigate = useNavigate();

  const navigateToFindid = () => {
    navigate("/find_id");
  };

  const navigateToFindpw = () => {
    navigate("/find_pw");
  };

  const navigateToCreate = () => {
    navigate("/create");
  };

  function handleChange(e: any) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  // login 확인
  async function Login_check() {
    const socket = io("http://localhost:3001", { transports: ["websocket"] });

    await Login_ID_PW.Send_Login_ID(socket, state.id);
    var ID_check = await Login_ID_PW.Rec_Login_ID(socket);
    if (ID_check === 2) {
      await Login_ID_PW.Send_Login_PW(socket, state.pw);
      var PW_check = await Login_ID_PW.Rec_Login_PW(socket);
      if (PW_check === 2) {
        alert("로그인 성공");
      } else if (PW_check === 1) {
        alert("아이디가 없거나 비밀번호가 틀립니다.");
      } else {
        alert("관리자에게 문의하세요.");
      }
    } else if (ID_check === 1) {
      alert("아이디가 없거나 비밀번호가 틀립니다.");
    } else {
      alert("관리자에게 문의하세요.");
    }
    socket.disconnect();
  }

  return (
    <div className="right_box">
      <div className="login_form">
        <div className="login_top_section">
          <div className="login_input_section">
            <input
              type="text"
              name="id"
              className="login_id"
              placeholder="아이디"
              onChange={handleChange}
            ></input>
            <input
              type="password"
              name="pw"
              className="login_password"
              value={state.pw}
              placeholder="비밀번호"
              onChange={handleChange}
            ></input>
          </div>
          <form method="get">
            <button type="button" className="login_btn" onClick={Login_check}>
              로그인
            </button>
          </form>
        </div>
        <div className="login_option">
          <form method="get" className="option1">
            <button
              type="submit"
              className="option1_inner"
              onClick={navigateToFindid}
            >
              아이디
            </button>
          </form>
          <form method="get" className="option2">
            <button
              type="submit"
              className="option2_inner"
              onClick={navigateToFindpw}
            >
              비밀번호
            </button>
          </form>
          <form method="get" className="option3">
            <button
              type="submit"
              className="option3_inner"
              onClick={navigateToCreate}
            >
              회원가입
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
