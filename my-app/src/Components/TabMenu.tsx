import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Style/test_TabMenu.css";

const TabMenu: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const location = useLocation();
  const userInfo = { ...location.state };

  const navigate = useNavigate();

  function write_Notice() {
    navigate("/postboard_insert", {
      state: { id: userInfo.id, title: "공지사항" },
    });
  }

  function write_Complaint() {
    navigate("/postboard_insert", {
      state: { id: userInfo.id, title: "불만사항" },
    });
  }

  function read_Notice() {
    navigate("/postboard_notice", {
      state: { id: userInfo.id, cur_num: 1 },
    });
  }

  function read_Complaint() {
    navigate("/postboard_complaint", {
      state: { id: userInfo.id, cur_num: 1 },
    });
  }

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
    <div className="topmenubar">
      <nav className="navi">
        <ul className={use ? "topmenu_font_ul" : "test_topmenu_font_ul"}>
          <li
            className={isHovering ? "topmenu_hover" : "topmenu"}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            기타
            <ul className={isHovering ? "topmenu_hover_ul" : "topmenu_ul"}>
              <li
                className={
                  isHovering ? "topmenu_font_li" : "test_topmenu_font_li"
                }
                onClick={write_Notice}
              >
                공지사항 작성
              </li>
              <li
                className={
                  isHovering ? "topmenu_font_li" : "test_topmenu_font_li"
                }
                onClick={write_Complaint}
              >
                불만사항 작성
              </li>
              <li
                className={
                  isHovering ? "topmenu_font_li" : "test_topmenu_font_li"
                }
                onClick={read_Notice}
              >
                공지사항
              </li>
              <li
                className={
                  isHovering ? "topmenu_font_li" : "test_topmenu_font_li"
                }
                onClick={read_Complaint}
              >
                불만사항
              </li>
            </ul>
          </li>
          <li
            className={isHovering ? "topmenu_hover" : "topmenu"}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            메뉴2
            <ul className={isHovering ? "topmenu_hover_ul" : "topmenu_ul"}>
              <li>메뉴2-1</li>
              <li>메뉴2-2</li>
              <li>메뉴2-3</li>
            </ul>
          </li>
          <li
            className={isHovering ? "topmenu_hover" : "topmenu"}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            메뉴3
            <ul className={isHovering ? "topmenu_hover_ul" : "topmenu_ul"}>
              <li>메뉴3-1</li>
              <li>메뉴3-2</li>
              <li>메뉴3-3</li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TabMenu;
