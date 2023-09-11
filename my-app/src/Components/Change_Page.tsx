import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Change_Page = () => {
  const location = useLocation();
  const user_info = { ...location.state };
  const navigate = useNavigate();
  useEffect(() => {
    if (user_info.name === "main_page") {
      navigate("/main_page", {
        state: {
          id: user_info.id,
          cur_num: user_info.cur_num,
          page: user_info.page,
        },
      });
    }
  });
  return <div>페이지 이동중</div>;
};

export default Change_Page;
