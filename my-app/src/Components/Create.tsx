import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import io from "socket.io-client";
const socket = io("http://localhost:3001", { transports: ["websocket"] });

function Create() {
  const [state, setState] = useState({
    id: "",
    pw: "",
    pw_check: "",
    name: "",
    phone: "",
    SSN: "",
    email: "",
    Duplicate: 0,
    count: 0,
  });

  const navigate = useNavigate();

  // function navigateToBack() {
  //   navigate("/");
  // }

  function handleChange(e: any) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function send_msg() {
    socket.emit("Send Duplicate Check", {
      id: state.id,
    });
    setState({
      ...state,
      id: "",
    });
  }

  function rec_msg() {
    socket.on("Receive Duplicate Check", (message) => {
      setState({
        ...state,
        Duplicate: message.receive_msg,
      });
    });
  }

  function send_msg1() {
    setState({
      ...state,
      Duplicate: 0,
      count: 0,
    });
    alert(state.Duplicate);
    socket.connect();
    send_msg();
    const timer = setInterval(() => {
      setState({
        ...state,
        count: state.count + 1,
      });
    }, 1000);
    rec_msg();
  }

  useEffect(() => {
    console.log("user 값이 설정됨");
    console.log(state.Duplicate);
    return () => {
      console.log("user 가 바뀌기 전..");
      console.log(state.Duplicate);
    };
  }, [state.Duplicate]);

  function user_update() {
    // socket.disconnect();
  }

  async function pre_id_Check() {
    if (state.id === "") {
      alert("아이디를 입력해주세요.");
    } else {
      await send_msg1();

      if (state.Duplicate === 0) {
        alert("0 입니다.");
      } else if (state.Duplicate === 1) {
        alert("1 입니다.");
      } else {
        alert("2 입니다.");
      }
    }
  }

  return (
    <div className="box">
      <form className="create_form">
        <fieldset className="inner_form">
          <legend className="title">회원가입</legend>
          <div className="id_title">
            <span className="subtitle1">아이디 : </span>
            <div className="id_section">
              <input
                type="text"
                name="id"
                className="id"
                value={state.id}
                placeholder="아이디를 입력해주세요"
                onChange={handleChange}
              ></input>
              <button
                type="button"
                className="id_check_btn"
                onClick={pre_id_Check}
              >
                중복
              </button>
            </div>
          </div>
          <div>
            <span className="subtitle">비밀번호 : </span>
            <input
              type="password"
              name="pw"
              className="pw"
              value={state.pw}
              placeholder="비밀번호를 입력해주세요"
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <span className="subtitle">비밀번호 확인 : </span>
            <input
              type="password"
              name="pw_check"
              className="pw"
              value={state.pw_check}
              placeholder="비밀번호를 입력해주세요"
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <span className="subtitle1">이름 : </span>
            <input
              type="text"
              name="name"
              className="name"
              value={state.name}
              placeholder="이름을 입력해주세요"
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <span className="subtitle">전화번호 : </span>
            <input
              type="text"
              name="phone"
              className="phone"
              value={state.phone}
              placeholder="전화번호를 입력해주세요"
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <span className="subtitle">주민번호 : </span>
            <input
              type="text"
              name="SSN"
              className="SSN"
              value={state.SSN}
              placeholder="주민번호를 입력해주세요"
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <span className="subtitle">e-mail : </span>
            <input
              type="text"
              name="email"
              className="email"
              value={state.email}
              placeholder="이메일을 입력해주세요"
              onChange={handleChange}
            ></input>
          </div>
        </fieldset>
        <button type="button" className="create_btn" onClick={user_update}>
          확인
        </button>
      </form>
    </div>
  );
}

export default Create;
