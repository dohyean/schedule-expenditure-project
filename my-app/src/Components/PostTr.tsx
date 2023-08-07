import React from "react";
import PostTd from "./PostTd";

interface PostItem {
  id: number;
  name: string;
  date: string;
  title: string;
  content: string;
}

interface PostTrProps {
  info: PostItem[];
  handleRemove: (id: number) => void;
  handleEdit: (item: PostItem) => void;
}

const PostTr: React.FC<PostTrProps> = ({ info, handleRemove, handleEdit }) => {
  return (
    <tbody>
      {info.map((item) => (
        <PostTd
          key={item.id}
          item={item}
          handleRemove={handleRemove}
          handleEdit={handleEdit}
        />
      ))}
    </tbody>
  );
};

export default PostTr;
