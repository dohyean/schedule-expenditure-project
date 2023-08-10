import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../Style/PostFunc.css";
import io from "socket.io-client";

const PostFunc_Save = require("../Function/PostFunc_Save.js");

interface FormValues {
  name: string;
  date: string;
  title: string;
  content: string;
}

const Test_board_add = () => {
  const location = useLocation();
  const userInfo = { ...location.state };

  const navigate = useNavigate();

  var cur_date = String(new Date().toISOString().substring(0, 10));
  const [form, setForm] = useState<FormValues>({
    name: userInfo.id,
    date: cur_date,
    title: "",
    content: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForm({
      name: "",
      date: "",
      title: "",
      content: "",
    });
  };

  function test() {
    if (form.title.length < 30) {
      if (form.content.length < 3000) {
        const socket = io("http://localhost:3001", {
          transports: ["websocket"],
        });
        if (userInfo.title === "공지사항") {
          PostFunc_Save.Send_Notice_Data(socket, form);
        } else {
        }
        socket.disconnect();
        navigate("/test", { state: { id: userInfo.id } });
      } else {
        alert("내용이 너무 깁니다.");
      }
    } else {
      alert("제목이 너무 깁니다.");
    }
    navigate("/test", { state: { id: userInfo.id } });
  }

  return (
    <form className="add_area" onSubmit={handleSubmit}>
      <h3 className="h3">{userInfo.title} 추가</h3>
      <div className="add1">
        <label htmlFor="username" className="label">
          작성자
          <input
            className="input_label"
            required
            placeholder="작성자를 입력해주세요."
            type="text"
            name="name"
            readOnly={true}
            value={form.name}
          />
        </label>
        <br></br>
        <label htmlFor="date" className="label">
          작성날짜
          <input
            className="input_label"
            required
            placeholder="작성날짜를 입력해주세요."
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="add2">
        <label htmlFor="title" className="label">
          제목
          <input
            className="input_label"
            required
            placeholder="제목을 입력해주세요."
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </label>
        <br></br>
        <label htmlFor="content" className="label">
          작성내용
          <input
            className="input_label"
            required
            placeholder="작성내용을 입력해주세요."
            type="text"
            name="content"
            value={form.content}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="save">
        <button className="save_btn" type="submit" onClick={test}>
          저장
        </button>
      </div>
    </form>
  );
};

export default Test_board_add;
