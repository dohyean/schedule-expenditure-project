import "../Style/PostBoard.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TabMenu from "./TabMenu";
import User_Infomation from "./User_Infomation";

function Main_Page() {
  const location = useLocation();
  const user_info = { ...location.state };

  return (
    <form>
      <div className="body_box">
        <TabMenu />
        <User_Infomation />
      </div>
    </form>
  );
}

export default Main_Page;
