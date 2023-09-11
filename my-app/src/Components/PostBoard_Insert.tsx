import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Style/PostFunc.css";
import io from "socket.io-client";

const PostFunc_Save = require("./Function/PostFunc_Save.js");
const PostFunc_User_Name = require("./Function/PostFunc_User_Name.js");
interface FormValues {
  id: string;
  name: string;
  date: string;
  title: string;
  content: string;
}

function PostBoard_Insert() {
  const location = useLocation();
  const user_info = { ...location.state };

  const navigate = useNavigate();

  var cur_date = String(new Date().toISOString().substring(0, 10));

  const [form, setForm] = useState<FormValues>({
    id: user_info.id,
    name: "",
    date: cur_date,
    title: "",
    content: "",
  });

  async function user_name() {
    const socket = io("http://localhost:3001", { transports: ["websocket"] });
    await PostFunc_User_Name.Send_User_Name(socket, user_info.id);
    var name = await PostFunc_User_Name.Rec_User_Name(socket);
    setForm({
      ...form,
      name: name,
    });
    socket.disconnect();
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    user_name();
  }, []);

  function Go_Back() {
    navigate("/main_page", {
      state: {
        id: user_info.id,
        cur_num: user_info.cur_num,
        page: user_info.title,
      },
    });
  }

  async function post_data_insert() {
    if (form.title.length < 30) {
      if (form.content.length < 3000) {
        const socket = io("http://localhost:3001", {
          transports: ["websocket"],
        });
        var data = 0;
        if (user_info.title === "공지사항") {
          await PostFunc_Save.Send_Notice_Data(socket, form);
          data = await PostFunc_Save.Rec_Notice_Data(socket);
        } else {
          await PostFunc_Save.Send_Complaint_Data(socket, form);
          data = await PostFunc_Save.Rec_Complaint_Data(socket);
        }
        if (data === 1) {
          navigate("/main_page", {
            state: { id: user_info.id, cur_num: 1, page: user_info.title },
          });
        } else {
          alert("관리자에게 문의해주세요.");
        }
        socket.disconnect();
      } else {
        alert("내용이 너무 깁니다.");
      }
    } else {
      alert("제목이 너무 깁니다.");
    }
  }

  return (
    <form className="add_area">
      <h3 className="h3">{user_info.title} 작성</h3>
      <div className="add1">
        <label htmlFor="username" className="label">
          작성자
          <br></br>
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
          <br></br>
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
          <br></br>
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
      </div>
      <div className="add2">
        <label htmlFor="content" className="label">
          작성내용
          <br></br>
          <textarea
            className="input_label"
            required
            placeholder="작성내용을 입력해주세요."
            name="content"
            value={form.content}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="save">
        <button className="save_btn" type="button" onClick={post_data_insert}>
          저장
        </button>
        <button className="save_btn" type="button" onClick={Go_Back}>
          취소
        </button>
      </div>
    </form>
  );
}

export default PostBoard_Insert;
