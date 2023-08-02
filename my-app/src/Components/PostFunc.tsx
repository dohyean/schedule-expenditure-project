import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormValues {
  id: number;
  name: string;
  date: string;
  title: string;
  content: string;
}

interface PostFuncProps {
  onSaveData: (data: FormValues) => void;
}

const PostFunc: React.FC<PostFuncProps> = ({ onSaveData }) => {
  const [form, setForm] = useState<FormValues>({
    id: 0,
    name: "",
    date: "",
    title: "",
    content: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSaveData(form);
    console.log(form);
    setForm({
      id: 0,
      name: "",
      date: "",
      title: "",
      content: "",
    });
  };

  return (
    <form className="mt-3" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row mb-1">
        <label
          htmlFor="username"
          className="w-full flex-1 mx-2 text-xs font-semibold text-gray-600 uppercase"
        >
          작성자
          <input
            className="w-full py-3 px-1 mt-1 text-gray-800 appearance-none border-2 border-gray-100 focus: text-gray-500 focus:outline-none focus:border-gray-200"
            required
            placeholder="작성자를 입력해주세요."
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </label>
        <label
          htmlFor="date"
          className="w-full flex-1 mx-2 text-xs font-semibold text-gray-600 uppercase"
        >
          작성날짜
          <input
            className="w-full py-3 px-1 mt-1 text-gray-800 appearance-none border-2 border-gray-100 focus: text-gray-500 focus:outline-none focus:border-gray-200"
            required
            placeholder="작성날짜를 입력해주세요."
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="flex flex-col md:flex-row">
        <label
          htmlFor="title"
          className="w-full flex-1 mx-2 text-xs font-semibold text-gray-600 uppercase"
        >
          제목
          <input
            className="w-full py-3 px-1 mt-1 text-gray-800 appearance-none border-2 border-gray-100 focus: text-gray-500 focus:outline-none focus:border-gray-200"
            required
            placeholder="제목을 입력해주세요."
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </label>
        <label
          htmlFor="content"
          className="w-full flex-1 mx-2 text-xs font-semibold text-gray-600 uppercase"
        >
          작성내용
          <input
            className="w-full py-3 px-1 mt-1 text-gray-800 appearance-none border-2 border-gray-100 focus: text-gray-500 focus:outline-none focus:border-gray-200"
            required
            placeholder="작성내용을 입력해주세요."
            type="text"
            name="content"
            value={form.content}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="text-center">
        <button
          className="bg-blue-400 py-2 text-center px-10 md:px-12 md:py-3 text-white rounded text-xl md:text-base mt-4"
          type="submit"
        >
          저장
        </button>
      </div>
    </form>
  );
};

export default PostFunc;
