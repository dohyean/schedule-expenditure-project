import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Style/PostFunc.css";
import io from "socket.io-client";

const PostModal_Update = require("./Function/PostModal_Update.js");
interface FormValues {
  id: string;
  name: string;
  date: string;
  title: string;
  content: string;
  origin_title: string;
  origin_content: string;
}

function PostModal() {
  const location = useLocation();
  const user_info = { ...location.state };

  const navigate = useNavigate();

  const [form, setForm] = useState<FormValues>({
    id: user_info.item.id,
    name: user_info.item.name,
    date: user_info.item.date,
    title: user_info.item.title,
    content: user_info.item.content,
    origin_title: user_info.item.title,
    origin_content: user_info.item.content,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  function Go_Back() {
    if (user_info.notice_complaint === "공지사항") {
      navigate("/PostBoard_Notice", {
        state: { id: user_info.item.id, cur_num: user_info.cur_num },
      });
    } else {
      navigate("/postboard_complaint", {
        state: { id: user_info.item.id, cur_num: user_info.cur_num },
      });
    }
  }

  async function post_data_modal() {
    if (form.title.length < 30) {
      if (form.content.length < 3000) {
        const socket = io("http://localhost:3001", {
          transports: ["websocket"],
        });
        var data = 0;
        if (user_info.notice_complaint === "공지사항") {
          await PostModal_Update.Send_Notice_Data_Update(socket, form);
          data = await PostModal_Update.Rec_Notice_Data_Update(socket);
        } else {
          await PostModal_Update.Send_Complaint_Data_Update(socket, form);
          data = await PostModal_Update.Rec_Complaint_Data_Update(socket);
        }
        if (data === 1) {
          alert("성공");
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
      <h3 className="h3">{user_info.title} 수정</h3>
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
        <button className="save_btn" type="button" onClick={post_data_modal}>
          저장
        </button>
        <button className="save_btn" type="button" onClick={Go_Back}>
          취소
        </button>
      </div>
    </form>
  );
}

export default PostModal;
