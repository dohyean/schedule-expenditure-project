import "../Style/TabMenu.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

interface TabMenuProps {
  user_id: string;
  browser: boolean;
  hovering_check: (input_data: boolean) => void;
}

const TabMenu: React.FC<TabMenuProps> = ({
  user_id,
  browser,
  hovering_check,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
    hovering_check(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
    hovering_check(false);
  };

  const navigate = useNavigate();

  function read_Notice() {
    alert("공지사항");
    navigate("/change_page", {
      state: { id: user_id, cur_num: 1, page: "공지사항", name: "main_page" },
    });
  }

  function read_Complaint() {
    alert("불만사항");
    navigate("/change_page", {
      state: { id: user_id, cur_num: 1, page: "불만사항", name: "main_page" },
    });
  }

  return (
    <div
      className={
        isHovering ? "tabmenu_div_not_hovering" : "tabmenu_div_hovering"
      }
      onMouseOut={handleMouseOut}
      onMouseOver={handleMouseOver}
    >
      <form className={browser ? "tabmenu_form" : "tabmenu_form_browser"}>
        <div className="topForm_main_ul">테스트1</div>
        <div className="topForm_main_ul">테스트2</div>
        <div className="topForm_main_ul">기타</div>
      </form>
      <div>
        <form
          className={
            isHovering ? "tabmenu_form_hovering" : "tabmenu_form_not_hovering"
          }
        >
          <div className="bottmForm_sub_div">
            <ul className="bottomForm_font_size">1-1</ul>
            <ul className="bottomForm_font_size">1-2</ul>
            <ul className="bottomForm_font_size">1-3</ul>
          </div>
          <div className="bottmForm_sub_div">
            <ul className="bottomForm_font_size">2-1</ul>
            <ul className="bottomForm_font_size">2-2</ul>
            <ul className="bottomForm_font_size">2-3</ul>
          </div>
          <div className="bottmForm_sub_div">
            <ul className="bottomForm_font_size" onClick={read_Notice}>
              공지사항
            </ul>
            <ul className="bottomForm_font_size" onClick={read_Complaint}>
              불만사항
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TabMenu;
