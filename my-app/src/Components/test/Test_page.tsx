// 테스트입니다.
import React, { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TabMenu from "./test_TabMenu";

const PostBoard: React.FC = () => {
  return (
    <div className="test">
      <TabMenu />
    </div>
  );
};

export default PostBoard;
