import { useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
const Find_PW_ID_Phone = require("./Function/Find_PW_ID_Phone.js");

const Find_pw = () => {
  const [state, setState] = useState({
    id: "",
    phone: "",
  });

  const navigate = useNavigate();

  // const navigateToBack = () => {
  //   navigate("/");
  // };

  function handleChange(e: any) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function find_pw_id_phone() {
    const socket = io("http://localhost:3001", { transports: ["websocket"] });
    await Find_PW_ID_Phone.Send_Find_PW(socket, state);
    var PW = await Find_PW_ID_Phone.Rec_Find_PW(socket);
    if (PW.num === 2) {
      alert('비밀번호는 "' + PW.PW + '"입니다.');
    } else if (PW.num === 1) {
      alert("아이디 혹은 이메일이 잘못되었습니다.");
    } else {
      alert("관리자에게 문의해주세요.");
    }
    socket.disconnect();
  }

  return (
    <div className="box">
      <form method="post" className="find_pw_form">
        <fieldset className="inner_pw_form">
          <legend className="find_pw_title">비밀번호 찾기</legend>
          <div>
            <input
              type="text"
              name="id"
              className="id"
              value={state.id}
              placeholder="ID를 입력해주세요"
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <input
              type="text"
              name="phone"
              className="phone"
              value={state.phone}
              placeholder="전화번호를 입력해주세요"
              onChange={handleChange}
            ></input>
            <button
              type="button"
              className="find_pw_btn"
              onClick={find_pw_id_phone}
            >
              확인
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Find_pw;
