import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
const Create_ID_Dpulicate = require("./Function/Create_ID_Duplicate.js");
const Create_PW_Rule_check = require("./Function/Create_PW_Rule_check.js");
const Create_User_Data = require("./Function/Create_User_Data.js");

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
  const navigateToBack = () => {
    navigate("/");
  };

  function handleChange(e: any) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function Duplicate_set(num: number) {
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
        alert("관리지에게 문의해주세요.");
      }
      socket.disconnect();
    }
  }

  async function User_Data_Save() {
    const socket = io("http://localhost:3001", { transports: ["websocket"] });
    await Create_User_Data.Send_User_Data(socket, state);
    var User_save = await Create_User_Data.Rec_User_Data(socket);
    if (User_save === 0) {
      alert("관리자에게 문의해주세요.");
    } else {
      alert("회원가입이 완료되었습니다.");
      navigateToBack();
    }
    socket.disconnect();
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
          if (Create_PW_Rule_check.PW_Rule_check(state.pw) === 0) {
            User_Data_Save();
          } else {
            alert("8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.");
          }
        } else {
          alert("비밀번호가 다릅니다.");
        }
      }
    }
  }

  function ID_Click() {
    Duplicate_set(0);
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
                onClick={ID_Click}
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
