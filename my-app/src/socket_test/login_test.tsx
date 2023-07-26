import { Component } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3001");

// 테스트 페이지 나중에 login 페이지와 연결시 몇가지를 가져다 사용할 예정
class login extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      id: "",
      pw: "",
    };
  }

  state = {
    id: "",
    pw: "",
  };

  // textbox 내용을 실시간으로 동기화
  handleChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // 메세지 전송
  sendMsg = (e: any) => {
    e.preventDefault();
    socket.emit("login message", {
      id: this.state.id,
      pw: this.state.pw,
    });
    this.setState({
      id: "",
      pw: "",
    });
  };

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            name="id"
            placeholder="id"
            value={this.state.id}
            onChange={this.handleChange}
          ></input>
          <input
            type="password"
            name="pw"
            placeholder="pw"
            value={this.state.pw}
            onChange={this.handleChange}
          ></input>
          <button type="submit" onClick={this.sendMsg}>
            전송
          </button>
        </form>
      </div>
    );
  }
}
export default login;
