import React, { useState } from "react";
import "../Style/PostFunc.css";

interface FormValues {
  name: string;
  date: string;
  title: string;
  content: string;
}

interface PostFuncProps {
  onSaveData: (data: FormValues) => void;
}

const PostFunc: React.FC<PostFuncProps> = ({ onSaveData }) => {
  var cur_date = String(new Date().toISOString().substring(0, 10));
  const [form, setForm] = useState<FormValues>({
    name: "",
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
    onSaveData(form);
    console.log(form);

    setForm({
      name: "",
      date: "",
      title: "",
      content: "",
    });
  };

  return (
    <form className="add_area" onSubmit={handleSubmit}>
      <script>test()</script>
      <h3 className="h3">게시글 추가</h3>
      <div className="add1">
        <label htmlFor="username" className="label">
          작성자
          <input
            className="input_label"
            required
            placeholder="작성자를 입력해주세요."
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
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
        <button className="save_btn" type="submit">
          저장
        </button>
      </div>
    </form>
  );
};

export default PostFunc;
