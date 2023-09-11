import "../Style/User_Infomation.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function User_Infomation() {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/postboard_main", {
      state: { cur_num: 1 },
    });
  };

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
    <div className="login_form">
      <div
        className={use ? "user_logout" : "test_user_logout"}
        onClick={logout}
      >
        로그아웃
      </div>
    </div>
  );
}

export default User_Infomation;
