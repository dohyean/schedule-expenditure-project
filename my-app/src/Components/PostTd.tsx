import React from "react";
import "../Style/PostTd.css";
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
  handleDataChange: () => void;
}

const PostTd: React.FC<PostTdProps> = ({
  item,
  user_id,
  notice_complaint,
  cur_num,
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

  if (item.id === user_id) {
    return (
      <tr className="tr2">
        <th className="tb" onClick={onContent}>
          {item.order}
        </th>
        <th className="tb" onClick={onContent}>
          {item.name}
        </th>
        <th className="tb" onClick={onContent}>
          {item.date}
        </th>
        <th className="tb" onClick={onContent}>
          {item.title}
        </th>
        <th className="tb" onClick={onContent}>
          {item.content}
        </th>
        <th onClick={onEdit} className="edit_btn">
          <FontAwesomeIcon icon={faEdit} />
        </th>
        <th onClick={onRemove} className="remove_btn">
          <FontAwesomeIcon icon={faTrashAlt} />
        </th>
      </tr>
    );
  } else {
    return (
      <tr className="tr2">
        <th className="tb" onClick={onContent}>
          {item.order}
        </th>
        <th className="tb" onClick={onContent}>
          {item.name}
        </th>
        <th className="tb" onClick={onContent}>
          {item.date}
        </th>
        <th className="tb" onClick={onContent}>
          {item.title}
        </th>
        <th className="tb" onClick={onContent}>
          {item.content}
        </th>
        <th className="not_use_edit_btn">
          <FontAwesomeIcon icon={faEdit} />
        </th>
        <th className="not_use_remove_btn">
          <FontAwesomeIcon icon={faTrashAlt} />
        </th>
      </tr>
    );
  }
};
export default PostTd;
