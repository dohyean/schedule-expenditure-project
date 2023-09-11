import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../Style/PostBoard_Main.css";
import Login from "./Login";
import PostBoard from "./PostBoard";
import io from "socket.io-client";
import TabMenu from "./TabMenu";

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

const PostBoard_Main: React.FC = () => {
  const location = useLocation();
  const user_info = { ...location.state };
  const [send_postboard_num, setSendPostboardNum] = useState<number>(
    user_info.cur_num
  );
  const [page, setPage] = useState<string>(user_info.page);

  const [isHovering, setIsHovering] = useState(false);

  const [resize_width, setResizeWidth] = useState(Number(window.innerWidth));
  const [browser, setBrowser] = useState(true);
  const handleResize = () => {
    setResizeWidth(Number(window.innerWidth));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    if (resize_width > 900) {
      setBrowser(true);
    } else {
      setBrowser(false);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const hovering_check = (input_data: boolean) => {
    setIsHovering(input_data);
  };

  return (
    <form
      className={
        browser ? "postboard_main_form" : "postboard_main_form_hovering"
      }
    >
      <form className="postboard_main_left_form">
        <form
          className={
            browser
              ? "postboard_main_left_top_form"
              : "postboard_main_left_top_form_browser"
          }
        >
          <TabMenu
            user_id={""}
            browser={browser}
            hovering_check={hovering_check}
          />
        </form>
        <form
          className={
            browser
              ? "postboard_main_left_bottom_form"
              : `${
                  isHovering
                    ? "postboard_main_left_bottom_form_browser_hover"
                    : "postboard_main_left_bottom_form_browser"
                } `
          }
        >
          <PostBoard
            user_id={""}
            notice_complaint={"로그인 공지사항"}
            rec_postboard_num={send_postboard_num}
            browser={browser}
          />
        </form>
      </form>
      <form className="postboard_main_right_form">
        <Login />
      </form>
    </form>
  );
};

export default PostBoard_Main;
