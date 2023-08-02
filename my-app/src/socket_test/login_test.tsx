import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3001");

// 테스트 페이지 나중에 login 페이지와 연결시 몇가지를 가져다 사용할 예정
function Login() {
  const [state, setState] = useState({
    id: "",
    pw: "",
    Duplicate: 0,
  });

  function handleChange(e: any) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function send_msg() {
    return new Promise((resolve, reject) => {
      socket.emit("Send Duplicate Check", {
        id: state.id,
      });
      setState({
        ...state,
        id: "",
      });
      resolve(0);
    });
  }

  async function rec_msg() {
    await send_msg();
    return new Promise((resolve, reject) => {
      socket.on("receive message", (message) => {
        setState({
          ...state,
          Duplicate: message.Duplicate,
        });
        resolve(message.Duplicate);
      });
    });
  }

  async function pre_id_Check() {
    if (state.id === "") {
      alert("아이디를 입력해주세요.");
    } else {
      var test = await rec_msg();

      alert(test);
      if (test === 0) {
        alert("0 입니다.");
      } else if (test === 1) {
        alert("1 입니다.");
      } else {
        alert("2 입니다.");
      }
    }
  }

  return (
    <div>
      <form>
        <input
          type="text"
          name="id"
          placeholder="id"
          value={state.id}
          onChange={handleChange}
        ></input>

        <button type="submit" onClick={pre_id_Check}>
          전송
        </button>
      </form>
    </div>
  );
}
export default Login;
