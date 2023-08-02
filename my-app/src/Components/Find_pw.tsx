import React from "react";
import { useNavigate } from "react-router-dom";

const Find_pw = () => {
  const navigate = useNavigate();

  const navigateToBack = () => {
    navigate("/");
  };

  return (
    <div className="box">
      <form method="post" className="find_pw_form">
        <fieldset className="inner_pw_form">
          <legend className="find_pw_title">비밀번호 찾기</legend>
          <div>
            <input
              type="text"
              name="id"
              placeholder="ID를 입력해주세요"
            ></input>
          </div>
          <div>
            <input
              type="text"
              name="phone"
              placeholder="전화번호를 입력해주세요"
            ></input>
            <button type="button">확인</button>
          </div>

          <button type="button" onClick={navigateToBack}>
            종료
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Find_pw;
