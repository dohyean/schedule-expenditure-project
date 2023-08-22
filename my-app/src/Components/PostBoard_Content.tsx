import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Style/PostFunc.css";

interface FormValues {
  id: string;
  name: string;
  date: string;
  title: string;
  content: string;
}

function PostBoard_Content() {
  const location = useLocation();
  const user_info = { ...location.state };

  const navigate = useNavigate();

  const [form, setForm] = useState<FormValues>({
    id: user_info.id,
    name: user_info.name,
    date: user_info.date,
    title: user_info.title,
    content: user_info.content,
  });

  function Go_Back() {
    if (user_info.notice_complaint === "공지사항") {
      navigate("/PostBoard_Notice", {
        state: { id: user_info.id, cur_num: user_info.cur_num },
      });
    } else if (user_info.notice_complaint === "불만사항") {
      navigate("/postboard_complaint", {
        state: { id: user_info.id, cur_num: user_info.cur_num },
      });
    } else {
      navigate("/", {
        state: { cur_num: user_info.cur_num },
      });
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
            type="date"
            name="date"
            readOnly={true}
            value={form.date}
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
            type="text"
            name="title"
            readOnly={true}
            value={form.title}
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
            name="content"
            readOnly={true}
            value={form.content}
          />
        </label>
      </div>
      <div className="save">
        <button className="save_btn" type="button" onClick={Go_Back}>
          이전으로
        </button>
      </div>
    </form>
  );
}

export default PostBoard_Content;
