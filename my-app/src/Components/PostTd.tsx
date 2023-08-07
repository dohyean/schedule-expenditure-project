import React from "react";
import "../Style/PostTd.css";
// 밑에는 편집, 삭제 아이콘 사용을 위해 import함
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

interface PostItem {
  id: number;
  name: string;
  date: string;
  title: string;
  content: string;
}

interface PostTdProps {
  item: PostItem;
  handleRemove: (id: number) => void;
  handleEdit: (item: PostItem) => void;
}

const PostTd: React.FC<PostTdProps> = ({ item, handleRemove, handleEdit }) => {
  const onRemove = () => {
    handleRemove(item.id);
  };

  const onEdit = () => {
    handleEdit(item);
  };

  return (
    <tr className="tr2">
      <tbody className="tb">{item.id}</tbody>
      <tbody className="tb">{item.name}</tbody>
      <tbody className="tb">{item.date}</tbody>
      <tbody className="tb">{item.title}</tbody>
      <tbody className="tb">{item.content}</tbody>
      <tbody onClick={onEdit} className="edit_btn">
        <FontAwesomeIcon icon={faEdit} />
      </tbody>
      <tbody onClick={onRemove} className="remove_btn">
        <FontAwesomeIcon icon={faTrashAlt} />
      </tbody>
    </tr>
  );
};

export default PostTd;
