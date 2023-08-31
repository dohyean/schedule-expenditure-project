import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Style/PostBoard.css";
import PostTr from "./PostTr";
import io from "socket.io-client";

const PostBoard_Data_Save = require("./Function/PostBoard_Data_Save.js");
const PostBoard_Max_Num = require("./Function/PostBoard_Max_Num.js");

interface PostItem {
  order: number;
  id: string;
  name: string;
  date: string;
  title: string;
  content: string;
}

const PostBoard_Notice: React.FC = () => {
  const location = useLocation();
  const user_info = { ...location.state };
  const [notice, setNotice] = useState<PostItem[]>([]);
  const [cur_num, setCurNum] = useState<number>(user_info.cur_num);
  const [loading, setLoading] = useState(false);
  const [data_change, setDataChange] = useState<number>(1);

  const navigate = useNavigate();
  function Go_Back() {
    navigate("/main_page", {
      state: { id: user_info.id },
    });
  }

  function use_notice_save_data(data: any) {
    return new Promise((resolve, reject) => {
      var data_num = 0;
      notice.length = 0;
      while (true) {
        if (data.user_data[data_num] === undefined) {
          break;
        } else {
          const post: PostItem = {
            order: data.user_data[data_num].note_order,
            id: data.user_data[data_num].note_id,
            name: data.user_data[data_num].note_name,
            date: data.user_data[data_num].note_date,
            title: data.user_data[data_num].note_title,
            content: data.user_data[data_num].note_content,
          };
          notice[data_num] = post;
          data_num++;
        }
      }
      resolve(0);
    });
  }

  async function save_notice_data() {
    const socket = io("http://localhost:3001", { transports: ["websocket"] });
    await PostBoard_Data_Save.Send_Notice_Five_Data(socket, cur_num);
    const data = await PostBoard_Data_Save.Rec_Notice_Five_Data(socket);
    await use_notice_save_data(data);
    socket.disconnect();
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await save_notice_data();
      setLoading(false);
    };
    fetchData();
  }, [cur_num, data_change]);

  async function go_right() {
    const socket = io("http://localhost:3001", { transports: ["websocket"] });
    await PostBoard_Max_Num.Send_Notice_Max_Num(socket);
    var max_num = await PostBoard_Max_Num.Rec_Notice_Max_Num(socket);
    socket.disconnect();
    if (Number(max_num.max_num) >= cur_num + 20) {
      setCurNum(cur_num + 10);
    } else {
      if (Number(max_num.max_num) >= cur_num + 10) {
        setCurNum(cur_num + 10);
      }
    }
  }

  function go_left() {
    if (cur_num !== 1) {
      setCurNum(cur_num - 10);
    }
  }

  const set_data_change = () => {
    setDataChange(data_change * -1);
  };

  if (loading) {
    return <div>로딩중</div>;
  } else {
    return (
      <div className="body_box">
        {/* <TopMenu /> */}
        <div className="bottom_box">
          <div className="left_box">
            <div className="main_area">
              <div className="post_area">
                <div className="post_table">
                  <h1 className="h1">공지사항</h1>
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
                      info={notice}
                      user_id={user_info.id}
                      notice_complaint={"공지사항"}
                      cur_num={cur_num}
                      handleDataChange={set_data_change}
                    />
                  </table>
                  <table>
                    <thead>
                      <tr className="direction_button">
                        <th className="left_button" onClick={go_left}>
                          ◀
                        </th>
                        <th className="page_button">{cur_num} page</th>
                        <th className="right_button" onClick={go_right}>
                          ▶
                        </th>
                      </tr>
                    </thead>
                  </table>
                  <div onClick={Go_Back}>이전으로</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PostBoard_Notice;
