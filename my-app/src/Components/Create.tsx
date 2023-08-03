import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
const Create_ID_Dpulicate = require("./Function/Create_ID_Duplicate.js");

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
  });

  const navigate = useNavigate();

  function navigateToBack() {
    navigate("/");
  }

  function handleChange(e: any) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function Duplicate_set(num: any) {
    setState({
      ...state,
      Duplicate: num,
    });
  }

  // 아이디 중복 확인
  async function Duplicate_check() {
    Duplicate_set(0);
    if (state.id === "") {
      alert("아이디를 입력해주세요.");
    } else {
      const socket = io("http://localhost:3001", { transports: ["websocket"] });
      await Create_ID_Dpulicate.Send_Duplicate(socket, state.id);
      var Duplicate = await Create_ID_Dpulicate.Rec_Duplicate(socket);
      if (Duplicate === 2) {
        alert("아이디가 중복됩니다.");
      } else if (Duplicate === 1) {
        Duplicate_set(1);
        alert("사용가능한 아이디입니다.");
      } else {
        alert("관리지에게 문의하세요.");
      }
      socket.disconnect();
    }
  }

  // 최종 확인
  function Create_Membership_check() {
    if (state.Duplicate === 0) {
      alert("아이디 중복 확인해 주세요.");
    } else {
      if (
        state.pw === "" ||
        state.name === "" ||
        state.phone === "" ||
        state.SSN === "" ||
        state.email === ""
      ) {
        alert("정보를 입력하세요.");
      } else {
        if (state.pw === state.pw_check) {
          alert("회원가입이 완료되었습니다.");
          navigateToBack();
        } else {
          alert("비밀번호가 다릅니다.");
        }
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
                className="id_check_btn"
                type="button"
                onClick={Duplicate_check}
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
        <button
          type="button"
          className="create_btn"
          onClick={Create_Membership_check}
        >
          확인
        </button>
      </form>
    </div>
  );
}

export default Create;
