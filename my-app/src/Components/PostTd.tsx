import React from "react";

interface PostData {
  id: number;
  name: string;
  date: string;
  title: string;
  content: string;
}

interface PostTdProps {
  item: PostData;
  handleRemove: (id: number) => void;
  handleEdit: (item: PostData) => void;
}

const PostTd: React.FC<PostTdProps> = ({ item, handleRemove, handleEdit }) => {
  const onRemove = () => {
    handleRemove(item.id);
  };

  const onEdit = () => {
    handleEdit(item);
  };

  return (
    <tr className="bg-white border-2 border-gray-200">
      <td className="px-4 py-3">{item.id}</td>
      <td className="px-4 py-3">{item.name}</td>
      <td className="px-4 py-3">{item.date}</td>
      <td className="px-4 py-3">{item.title}</td>
      <td className="px-4 py-3">{item.content}</td>
      <td onClick={onEdit} className="text-center text-purple-400 cursor-pointer show-modal">
        <i className="far fa-edit"></i>
      </td>
      <td onClick={onRemove} className="text-center text-purple-400 cursor-pointer">
        <i className="far fa-trash-alt"></i>
      </td>
    </tr>
  );
};

export default PostTd;
