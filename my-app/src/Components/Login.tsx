import "../Style/Login.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

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

  // 아이디 확인
  function Send_Login_ID(socket: any) {
    return new Promise((resolve, reject) => {
      socket.emit("Send Login ID Check", {
        id: state.id,
      });
      resolve(0);
    });
  }
  function Rec_Login_ID(socket: any) {
    return new Promise((resolve, reject) => {
      socket.on("Receive Login ID Check", (message: any) => {
        resolve(message.ID_check);
      });
    });
  }

  // 패스워드 확인
  function Send_Login_PW(socket: any) {
    return new Promise((resolve, reject) => {
      socket.emit("Send Login PW Check", {
        pw: state.pw,
      });
      resolve(0);
    });
  }
  function Rec_Login_PW(socket: any) {
    return new Promise((resolve, reject) => {
      socket.on("Receive Login PW Check", (message: any) => {
        resolve(message.PW_check);
      });
    });
  }

  // login 확인
  async function Login_check() {
    const socket = io("http://localhost:3001", { transports: ["websocket"] });

    await Send_Login_ID(socket);
    var ID_check = await Rec_Login_ID(socket);
    if (ID_check === 2) {
      await Send_Login_PW(socket);
      var PW_check = await Rec_Login_PW(socket);
      if (PW_check === 2) {
        alert("pw 로그인 성공");
      } else if (PW_check === 1) {
        alert("pw 아이디가 없거나 비밀번호가 틀립니다.");
      } else {
        alert("pw 관리자에게 문의하세요.");
      }
    } else if (ID_check === 1) {
      alert("id 아이디가 없거나 비밀번호가 틀립니다.");
    } else {
      alert("id 관리자에게 문의하세요.");
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
            <Link to="/create">
              <button
                type="submit"
                className="option3_inner"
                // onClick={navigateToCreate}
              >
                회원가입
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
