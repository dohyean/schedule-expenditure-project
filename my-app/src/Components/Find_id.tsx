import { useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
const Find_ID_Email = require("./Function/Find_ID_Email.js");

const Find_id = () => {
  const [state, setState] = useState({
    email: "",
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

  async function find_id_email() {
    const socket = io("http://localhost:3001", { transports: ["websocket"] });
    await Find_ID_Email.Send_Find_ID(socket, state.email);
    var ID = await Find_ID_Email.Rec_Find_ID(socket);
    if (ID.num === 2) {
      alert('아이디는 "' + ID.ID + '"입니다.');
    } else if (ID.num === 1) {
      alert("해당하는 이메일이 없습니다.");
    } else {
      alert("관리자에게 문의해주세요.");
    }
    socket.disconnect();
    navigateToBack();
  }

  return (
    <div className="box">
      <form method="post" className="find_id_form">
        <fieldset className="inner_id_form">
          <legend className="find_id_title">아이디 찾기</legend>
          <div className="email_section">
            <span className="subtitle3">e-mail : </span>
            <input
              type="text"
              name="email"
              className="email"
              value={state.email}
              placeholder="이메일을 입력해주세요"
              onChange={handleChange}
            ></input>
            <button
              type="button"
              className="find_id_form_btn"
              onClick={find_id_email}
            >
              확인
            </button>
          </div>
        </fieldset>
        <button type="button" className="find_id_btn" onClick={navigateToBack}>
          로그인화면으로
        </button>
      </form>
    </div>
  );
};

export default Find_id;
