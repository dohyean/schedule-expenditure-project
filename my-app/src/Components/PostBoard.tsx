import React, { useRef, useState } from "react";
import "../Style/PostBoard.css";
/* import TopMenu from './TopMenu'; */
import Login from "./Login";
import PostFunc from "./PostFunc";
import PostTr from "./PostTr";
import PostModal from "./PostModal";

interface PostItem {
  id: number;
  name: string;
  date: string;
  title: string;
  content: string;
}

const PostBoard: React.FC = () => {
  const [info, setInfo] = useState<PostItem[]>([]);
  const [selected, setSelected] = useState<PostItem | null>(null);
  const [modalOn, setModalOn] = useState<boolean>(false);

  const nextId = useRef<number>(1);

  const handleSave = (data: any) => {
    const postItem: PostItem = {
      id: nextId.current,
      name: data.name,
      date: data.date,
      title: data.title,
      content: data.content,
    };

    setInfo((prevInfo) => [...prevInfo, postItem]);
    nextId.current += 1;
  };

  const handleRemove = (id: number) => {
    setInfo((prevInfo) => prevInfo.filter((item) => item.id !== id));
  };

  const handleEdit = (item: PostItem) => {
    setModalOn(true);
    setSelected(item);
  };

  const handleCancel = () => {
    setModalOn(false);
  };

  const handleEditSumit = (item: PostItem) => {
    handleSave(item);
    setModalOn(false);
  };

  return (
    <div className="body_box">
      {/* <TopMenu /> */}
      <div className="bottom_box">
        <div className="left_box">
          <div className="main_area">
            <div className="post_area">
              <div className="post_table">
                <h1 className="h1">공지사항 게시글 리스트</h1>
                <table className="table">
                  <thead className="thead">
                    <tr className="tr1">
                      <th className="contents1">순번</th>
                      <th className="contents1">작성자</th>
                      <th className="contents1">작성날짜</th>
                      <th className="contents1">제목</th>
                      <th className="contents1">작성내용</th>
                      <th className="contents1">편집</th>
                      <th className="contents1">삭제</th>
                    </tr>
                  </thead>
                  <PostTr
                    info={info}
                    handleRemove={handleRemove}
                    handleEdit={handleEdit}
                  />
                </table>
                <PostFunc onSaveData={handleSave} />
                {modalOn && (
                  <PostModal
                    selectedData={selected as PostItem}
                    handleCancel={handleCancel}
                    handleEditSumit={handleEditSumit}
                  />
                )}
              </div>
            </div>
            <div className="complain_area">
              <div className="complain_table">
                <h1 className="h1">불만사항 게시글 리스트</h1>
                <table className="table">
                  <thead className="thead">
                    <tr className="tr1">
                      <th className="contents1">순번</th>
                      <th className="contents1">작성자</th>
                      <th className="contents1">작성날짜</th>
                      <th className="contents1">제목</th>
                      <th className="contents1">작성내용</th>
                      <th className="contents1">편집</th>
                      <th className="contents1">삭제</th>
                    </tr>
                  </thead>
                  <PostTr
                    info={info}
                    handleRemove={handleRemove}
                    handleEdit={handleEdit}
                  />
                </table>
                <PostFunc onSaveData={handleSave} />
                {modalOn && (
                  <PostModal
                    selectedData={selected as PostItem}
                    handleCancel={handleCancel}
                    handleEditSumit={handleEditSumit}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <Login />
      </div>
    </div>
  );
};

export default PostBoard;
