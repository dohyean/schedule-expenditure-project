// 해당 클라이언트는 우리가 사용할 클라이언트는 아니지만 참고용으로 남겨둠
import React, { Component } from "react";
import io from "socket.io-client"; //모듈 가져오기
const socket = io.connect("http://localhost:3001"); //백엔드 서버 포트를3001와 socket연결

class client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "", //id
      msg: "", //메세지 내용
      role: "login",
      messageList: [], //메세지 리스트
    };
  }
  sendMsg = (e) => {
    e.preventDefault();
    socket.emit("send message", {
      //"send message"라는 이벤트 발생 (1)
      name: this.state.name,
      msg: this.state.msg,
      role: this.state.role,
    });
    this.setState({
      name: "",
      msg: "",
      role: this.state.role,
    });
  };

  componentWillMount() {
    socket.on("receive message", (message) => {
      //"receive message"라는 이벤트 받음(2)
      this.setState({
        messageList: [this.state.messageList, message],
      });
    });
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <section>
          {this.state.messageList.map((item) => (
            <div>
              <p className="username">{item.name}</p>
              <p className="msg_text">{item.msg}</p>
            </div>
          ))}
        </section>
        <form onSubmit={this.sendMsg}>
          <div>
            <input
              type="text"
              onChange={this.onChange}
              value={this.state.name}
              name="name"
              id="id"
              placeholder="id"
            />
            <input
              type="text"
              onChange={this.onChange}
              value={this.state.msg}
              name="msg"
              id="msg"
              placeholder="pw"
            />
          </div>
          <button type="submit">보내기</button>
        </form>
      </div>
    );
  }
}

export default client;
