import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../Style/test_TabMenu.css";

const TabMenu = () => {
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

  return (
    <div className="topmenubar">
      <nav className="navi">
        <ul>
          <li
            className={isHovering ? "topmenu_hover" : "topmenu"}
            onMouseOver={handleMouseOver}
          >
            공지사항 및 불만사항
            <ul
              className={isHovering ? "topmenu_hover_ul" : "topmenu_ul"}
              onMouseOut={handleMouseOut}
            >
              <li type="button" onClick={write_Notice}>
                공지사항 작성
              </li>
              <li type="button" onClick={write_Complaint}>
                불만사항 작성
              </li>
              <li type="button" onClick={read_Notice}>
                공지사항
              </li>
              <li type="button" onClick={read_Complaint}>
                불만사항
              </li>
            </ul>
          </li>
          <li
            className={isHovering ? "topmenu_hover" : "topmenu"}
            onMouseOver={handleMouseOver}
          >
            메뉴2
            <ul
              className={isHovering ? "topmenu_hover_ul" : "topmenu_ul"}
              onMouseOut={handleMouseOut}
            >
              <li>메뉴2-1</li>
              <li>메뉴2-2</li>
              <li>메뉴2-3</li>
            </ul>
          </li>
          <li
            className={isHovering ? "topmenu_hover" : "topmenu"}
            onMouseOver={handleMouseOver}
          >
            메뉴3
            <ul
              className={isHovering ? "topmenu_hover_ul" : "topmenu_ul"}
              onMouseOut={handleMouseOut}
            >
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
