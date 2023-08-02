import React from "react";
import PostTd from "./PostTd";

interface PostData {
  id: number;
  name: string;
  date: string;
  title: string;
  content: string;
}

interface PostTrProps {
  info: PostData[];
  handleRemove: (id: number) => void;
  handleEdit: (item: PostData) => void;
}

const PostTr: React.FC<PostTrProps> = ({ info, handleRemove, handleEdit }) => {
  return (
    <tbody>
      {info.map((item) => {
        return (
          <PostTd
            key={item.id}
            item={item}
            handleRemove={handleRemove}
            handleEdit={handleEdit}
          />
        );
      })}
    </tbody>
  );
};

export default PostTr;
