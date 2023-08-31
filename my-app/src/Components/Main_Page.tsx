import "../Style/Main_Page.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TabMenu from "./TabMenu";
import User_Infomation from "./User_Infomation";

function Main_Page() {
  const location = useLocation();
  const user_info = { ...location.state };

  const [resize_width, setResizeWidth] = useState(Number(window.innerWidth));
  const [resize_height, setResizeHeight] = useState(Number(window.innerHeight));
  const [use, setUse] = useState(true);

  const handleResize = () => {
    setResizeWidth(Number(window.innerWidth));
    setResizeHeight(Number(window.innerHeight));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    if (resize_width > 900) {
      setUse(true);
    } else {
      setUse(false);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <form>
      <div className="body_box">
        <div>너비 {resize_width}</div>
        <div>높이 {resize_height}</div>
        <div className="test_bottom_box">
          <div className={use ? "left_box" : "test_left_box"}>
            <div className="post_table">
              <table className="table">
                <TabMenu />
              </table>
            </div>
          </div>
          <div className={use ? "right_box" : "test_right_box"}>
            <User_Infomation />
          </div>
        </div>
      </div>
    </form>
  );
}

export default Main_Page;
