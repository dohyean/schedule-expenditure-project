import React from "react";
import "../Style/PostBoard_Td.css";
// 밑에는 편집, 삭제 아이콘 사용을 위해 import함
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const PostBoard_Delete = require("./Function/PostBoard_Delete.js");

interface PostItem {
  order: number;
  id: string;
  name: string;
  date: string;
  title: string;
  content: string;
}

interface PostTdProps {
  item: PostItem;
  user_id: string;
  notice_complaint: string;
  cur_num: number;
  browser: boolean;
  handleDataChange: () => void;
}

const PostBoard_Td: React.FC<PostTdProps> = ({
  item,
  user_id,
  notice_complaint,
  cur_num,
  browser,
  handleDataChange,
}) => {
  const navigate = useNavigate();

  async function onRemove() {
    const socket = io("http://localhost:3001", { transports: ["websocket"] });
    var del_success = 0;
    if (notice_complaint === "공지사항") {
      await PostBoard_Delete.Send_Notice_Data_Del(socket, item);
      del_success = await PostBoard_Delete.Rec_Notice_Data_Del(socket);
    } else {
      await PostBoard_Delete.Send_Complaint_Data_Del(socket, item);
      del_success = await PostBoard_Delete.Rec_Complaint_Data_Del(socket);
    }
    if (del_success === 0) {
      alert("관리자에게 문의하세요.");
    } else {
      handleDataChange();
    }
    socket.disconnect();
  }

  const onEdit = () => {
    navigate("/postmodal", {
      state: {
        item: item,
        notice_complaint: notice_complaint,
        cur_num: cur_num,
      },
    });
  };

  // 여기에 sql 데이터 연동 편집 기능 넣기
  const onContent = () => {
    navigate("/postboard_content", {
      state: {
        user_id: user_id,
        id: item.id,
        name: item.name,
        date: item.date,
        title: item.title,
        content: item.content,
        notice_complaint: notice_complaint,
        cur_num: cur_num,
      },
    });
  };

  return (
    <tr className={browser ? "postboard_td_tr" : "postboard_td_tr_browser"}>
      <th className="postboard_td_order_btn" onClick={onContent}>
        {item.order}
      </th>
      <th className="postboard_td_name_btn" onClick={onContent}>
        {item.name}
      </th>
      <th className="postboard_td_date_btn" onClick={onContent}>
        {item.date}
      </th>
      <th className="postboard_td_title_btn" onClick={onContent}>
        {item.title}
      </th>
      <th
        onClick={onEdit}
        className={
          item.id === user_id
            ? "postboard_td_edit_btn"
            : "postboard_td_edit_btn_no"
        }
      >
        <FontAwesomeIcon icon={faEdit} />
      </th>
      <th
        onClick={onRemove}
        className={
          item.id === user_id
            ? "postboard_td_del_btn"
            : "postboard_td_del_btn_no"
        }
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </th>
    </tr>
  );
};
export default PostBoard_Td;
