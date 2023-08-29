import "../Style/Login.css";
import React, { useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";

function User_Infomation() {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/postboard", {
      state: { cur_num: 1 },
    });
  };
  return (
    <div className="right_box">
      <div className="login_form">
        <div className="login_top_section">
          <div className="login_input_section">
            <div className="user_picutre"></div>
            <div className="user_name"></div>
            <div onClick={logout}>로그아웃</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User_Infomation;
