import React, { useRef, useState } from 'react';
import '../Style/PostBoard.css';
import Login from './Login';
import PostFunc from './PostFunc';
import PostTr from './PostTr';
import PostModal from './PostModal';

interface PostData {
  id: number;
  name: string;
  date: string;
  title: string;
  content: string;
}

const PostBoard: React.FC = () => {
  const [info, setInfo] = useState<PostData[]>([]);
  const [selected, setSelected] = useState<PostData | null>(null);
  const [modalOn, setModalOn] = useState(false);

  const nextId = useRef(1);

  const handleSave = (data: PostData) => {
    if (data.id) {
      setInfo((prevInfo) =>
        prevInfo.map((row) => (data.id === row.id ? data : row))
      );
    } else {
      setInfo((prevInfo) =>
        prevInfo.concat({
          id: nextId.current,
          name: data.name,
          date: data.date,
          title: data.title,
          content: data.content,
        })
      );
      nextId.current += 1;
    }
  };

  const handleRemove = (id: number) => {
    setInfo((prevInfo) => prevInfo.filter((item) => item.id !== id));
  };

  const handleEdit = (item: PostData) => {
    setModalOn(true);
    setSelected(item);
  };

  const handleCancel = () => {
    setModalOn(false);
  };

  const handleEditSumit = (item: PostData) => {
    handleSave(item);
    setModalOn(false);
  };

  return (
    <div className='body_box'>
      <div className="left_box">
        <div className="main_area">
          <div className="post_area">
            <h1>공지사항</h1>
            <div className="container max-w-screen-lg mx-auto">
              <div className="text-xl font-bold mt-5 mb-3 text-center">공지사항 게시글 리스트</div>
              <table className="min-w-full table-auto text-gray-800">
                <thead className="justify-between">
                  <tr className="bg-gray-800">
                    <th className="text-gray-300 px-4 py-3">순번</th>
                    <th className="text-gray-300 px-4 py-3">작성자</th>
                    <th className="text-gray-300 px-4 py-3">작성날짜</th>
                    <th className="text-gray-300 px-4 py-3">제목</th>
                    <th className="text-gray-300 px-4 py-3">작성내용</th>
                    <th className="text-gray-300 px-4 py-3">편집</th>
                    <th className="text-gray-300 px-4 py-3">삭제</th>
                  </tr>
                </thead>
                <PostTr info={info} handleRemove={handleRemove} handleEdit={handleEdit} />
              </table>
              <PostFunc onSaveData={handleSave} />
              {modalOn && selected && (
                <PostModal
                  selectedData={selected}
                  handleCancel={handleCancel}
                  handleEditSumit={handleEditSumit}
                />
              )}
            </div>
          </div>
          <div className="complain_area">
            <h1>불만사항</h1>
            <textarea></textarea>
          </div>
        </div>
      </div>
      <Login />
    </div>
  );
};

export default PostBoard;
