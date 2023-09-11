import "../Style/Main_Page.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TabMenu from "./TabMenu";
import User_Infomation from "./User_Infomation";
import PostBoard from "./PostBoard";

function Main_Page() {
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
  }, []);

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
            user_id={user_info.id}
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
          {
            {
              공지사항: (
                <PostBoard
                  user_id={user_info.id}
                  notice_complaint={"공지사항"}
                  rec_postboard_num={send_postboard_num}
                  browser={browser}
                />
              ),
              불만사항: (
                <PostBoard
                  user_id={user_info.id}
                  notice_complaint={"불만사항"}
                  rec_postboard_num={send_postboard_num}
                  browser={browser}
                />
              ),
            }[page]
          }
        </form>
      </form>
      <form className="postboard_main_right_form">
        <User_Infomation />
      </form>
    </form>
  );
}

export default Main_Page;
