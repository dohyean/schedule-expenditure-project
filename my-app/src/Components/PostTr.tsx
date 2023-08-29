import React from "react";
import PostTd from "./PostTd";

interface PostItem {
  order: number;
  id: string;
  name: string;
  date: string;
  title: string;
  content: string;
}

interface PostTrProps {
  info: PostItem[];
  user_id: string;
  notice_complaint: string;
  cur_num: number;
  handleDataChange: () => void;
}

const PostTr: React.FC<PostTrProps> = ({
  info,
  user_id,
  notice_complaint,
  cur_num,
  handleDataChange,
}) => {
  return (
    <tbody>
      {info.map((item) => (
        <PostTd
          key={item.order}
          item={item}
          user_id={user_id}
          notice_complaint={notice_complaint}
          cur_num={cur_num}
          handleDataChange={handleDataChange}
        />
      ))}
    </tbody>
  );
};

export default PostTr;
