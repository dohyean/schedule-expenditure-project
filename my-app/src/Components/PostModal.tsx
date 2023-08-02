import React, { useState, ChangeEvent, FormEvent } from "react";

interface PostData {
  id: number;
  name: string;
  date: string;
  title: string;
  content: string;
}

interface PostModalProps {
  selectedData: PostData;
  handleCancel: () => void;
  handleEditSumit: (editedData: PostData) => void;
}

const PostModal: React.FC<PostModalProps> = ({
  selectedData,
  handleCancel,
  handleEditSumit,
}) => {
  const [edited, setEdited] = useState<PostData>(selectedData);

  const onCancel = () => {
    handleCancel();
  };

  const onEditedChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEdited({
      ...edited,
      [name]: value,
    });
  };

  const onSubmitEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleEditSumit(edited);
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70">
      <div className="bg-white rounded shadow-lg w-10/12 md:w-1/3">
        <div className="border-b px-4 py-2 flex justify-between items-center">
          <h3 className="font-semibold text-lg">게시글 정보 수정하기</h3>
          <i
            className="fas fa-times cursor-pointer"
            onClick={onCancel}
          ></i>
        </div>
        <form onSubmit={onSubmitEdit}>
          <div className="p-3">
            <div>ID: {edited.id}</div>
            <div>
              작성자:{" "}
              <input
                className="border-2 border-gray-100"
                type="text"
                name="name"
                value={edited.name}
                onChange={onEditedChange}
              />
            </div>
            <div>
              작성날짜:{" "}
              <input
                className="border-2 border-gray-100"
                type="text"
                name="date"
                value={edited.date}
                onChange={onEditedChange}
              />
            </div>
            <div>
              제목:{" "}
              <input
                className="border-2 border-gray-100"
                type="text"
                name="title"
                value={edited.title}
                onChange={onEditedChange}
              />
            </div>
            <div>
              작성내용:{" "}
              <input
                className="border-2 border-gray-100"
                type="text"
                name="content"
                value={edited.content}
                onChange={onEditedChange}
              />
            </div>
          </div>
          <div className="flex justify-end items-center w-100 border-t p-3">
            <button
              className="bg-red-60 hover:bg-red-700 px-3 py-1 rounded text-white mr-1 close-modal"
              onClick={onCancel}
            >
              취소
            </button>
            <button
              type="submit"
              className="bg-blue-60 hover:bg-blue-700 px-3 py-1 rounded text-white"
              onClick={onCancel}
            >
              수정
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostModal;
