import React, { useState, useEffect } from "react";
import PostBoard_Tr from "./PostBoard_Tr";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "../Style/PostBoard.css";

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

interface PostTrProps {
  user_id: string;
  notice_complaint: string;
  rec_postboard_num: number;
  browser: boolean;
}

const PostBoard: React.FC<PostTrProps> = ({
  user_id,
  notice_complaint,
  rec_postboard_num,
  browser,
}) => {
  const [postboard_data, setPostboardData] = useState<PostItem[]>([]);
  const [send_postbaord_num, setSendPostboardNum] =
    useState<number>(rec_postboard_num);
  const [loading, setLoading] = useState(false);
  const [data_change, setDataChange] = useState<number>(1);

  function use_poastboard_save_data(data: any) {
    return new Promise((resolve, reject) => {
      var data_num = 0;
      postboard_data.length = 0;
      if (notice_complaint === "불만사항") {
        while (true) {
          if (data.user_data[data_num] === undefined) {
            break;
          } else {
            const post: PostItem = {
              order: data.user_data[data_num].complaint_order,
              id: data.user_data[data_num].complaint_id,
              name: data.user_data[data_num].complaint_name,
              date: data.user_data[data_num].complaint_date,
              title: data.user_data[data_num].complaint_title,
              content: data.user_data[data_num].complaint_content,
            };
            postboard_data[data_num] = post;
            data_num++;
          }
        }
      } else {
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
            postboard_data[data_num] = post;
            data_num++;
          }
        }
      }
      resolve(0);
    });
  }

  async function save_postboard_data() {
    if (notice_complaint === "불만사항") {
      const socket = io("http://localhost:3001", { transports: ["websocket"] });
      await PostBoard_Data_Save.Send_Complaint_Five_Data(
        socket,
        send_postbaord_num
      );
      const data = await PostBoard_Data_Save.Rec_Complaint_Five_Data(socket);
      console.log(data);
      await use_poastboard_save_data(data);
      socket.disconnect();
    } else {
      const socket = io("http://localhost:3001", { transports: ["websocket"] });
      await PostBoard_Data_Save.Send_Notice_Five_Data(
        socket,
        send_postbaord_num
      );
      const data = await PostBoard_Data_Save.Rec_Notice_Five_Data(socket);
      await use_poastboard_save_data(data);
      socket.disconnect();
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await save_postboard_data();
      setLoading(false);
    };
    fetchData();
  }, [send_postbaord_num, data_change]);

  async function go_right() {
    if (notice_complaint === "불만사항") {
      const socket = io("http://localhost:3001", { transports: ["websocket"] });
      await PostBoard_Max_Num.Send_Complaint_Max_Num(socket);
      var max_num = await PostBoard_Max_Num.Rec_Complaint_Max_Num(socket);
      socket.disconnect();
      if (Number(max_num.max_num) >= send_postbaord_num + 20) {
        setSendPostboardNum(send_postbaord_num + 10);
      } else {
        if (Number(max_num.max_num) >= send_postbaord_num + 10) {
          setSendPostboardNum(send_postbaord_num + 10);
        }
      }
    } else {
      const socket = io("http://localhost:3001", { transports: ["websocket"] });
      await PostBoard_Max_Num.Send_Notice_Max_Num(socket);
      var max_num = await PostBoard_Max_Num.Rec_Notice_Max_Num(socket);
      socket.disconnect();
      if (Number(max_num.max_num) >= send_postbaord_num + 20) {
        setSendPostboardNum(send_postbaord_num + 10);
      } else {
        if (Number(max_num.max_num) >= send_postbaord_num + 10) {
          setSendPostboardNum(send_postbaord_num + 10);
        }
      }
    }
  }

  function go_left() {
    if (send_postbaord_num !== 1) {
      setSendPostboardNum(send_postbaord_num - 10);
    }
  }

  const set_data_change = () => {
    setDataChange(data_change * -1);
  };

  const navigate = useNavigate();

  const postboard_insert = () => {
    navigate("/postboard_insert", {
      state: {
        id: user_id,
        cur_num: send_postbaord_num,
        title: notice_complaint,
      },
    });
  };

  if (loading) {
    return <div>로딩중</div>;
  } else {
    return (
      <div className="postboard_main_div">
        <h1 className={browser ? "postboard_h1" : "postboard_h1_browser"}>
          {notice_complaint}
        </h1>
        <h2 onClick={postboard_insert}>+</h2>

        <div
          className={
            browser ? "postboard_title_div" : "postboard_title_div_browser"
          }
        >
          <table className="postboard_title_table">
            <thead className="postboard_thead">
              <tr
                className={browser ? "postboard_tr1" : "postboard_tr1_browser"}
              >
                <th
                  className={
                    browser
                      ? "postboard_order_btn"
                      : "postboard_order_btn_browser"
                  }
                >
                  순번
                </th>
                <th
                  className={
                    browser
                      ? "postboard_name_btn"
                      : "postboard_name_btn_browser"
                  }
                >
                  작성자
                </th>
                <th
                  className={
                    browser
                      ? "postboard_date_btn"
                      : "postboard_date_btn_browser"
                  }
                >
                  작성날짜
                </th>
                <th
                  className={
                    browser
                      ? "postboard_title_btn"
                      : "postboard_title_btn_browser"
                  }
                >
                  제목
                </th>
                <th className="postboard_edit_btn">편집</th>
                <th className="postboard_del_btn">삭제</th>
              </tr>
            </thead>
          </table>
        </div>
        <div
          className={
            browser ? "postboard_content_div" : "postboard_content_div_browser"
          }
        >
          <table className="postboard_content_table">
            <PostBoard_Tr
              info={postboard_data}
              user_id={user_id}
              notice_complaint={notice_complaint}
              rec_postbaord_num={send_postbaord_num}
              browser={browser}
              handleDataChange={set_data_change}
            />
          </table>
        </div>
        <div className="postboard_btn_div">
          <table className="postboard_btn_table">
            <thead>
              <tr>
                <th className="postboard_left_btn" onClick={go_left}>
                  ◀
                </th>
                <th className="postboard_page_btn">
                  {Number((send_postbaord_num / 10).toFixed()) + 1} page
                </th>
                <th className="postboard_right_btn" onClick={go_right}>
                  ▶
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    );
  }
};

export default PostBoard;
