import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  function Start() {
    navigate("/postboard_main", {
      state: { cur_num: 1 },
    });
  }
  useEffect(() => {
    Start();
  }, []);
  return <div></div>;
}

export default Main;
