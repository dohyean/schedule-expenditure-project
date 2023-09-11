import React from "react";
import PostBoard_Td from "./PostBoard_Td";

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
  rec_postbaord_num: number;
  browser: boolean;
  handleDataChange: () => void;
}

const PostBoard_Tr: React.FC<PostTrProps> = ({
  info,
  user_id,
  notice_complaint,
  rec_postbaord_num,
  browser,
  handleDataChange,
}) => {
  return (
    <tbody className="postboard_tr_tbody">
      {info.map((item) => (
        <PostBoard_Td
          key={item.order}
          item={item}
          user_id={user_id}
          notice_complaint={notice_complaint}
          cur_num={rec_postbaord_num}
          browser={browser}
          handleDataChange={handleDataChange}
        />
      ))}
    </tbody>
  );
};

export default PostBoard_Tr;
