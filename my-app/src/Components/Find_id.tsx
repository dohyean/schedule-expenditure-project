import React from "react";
import { useNavigate } from "react-router-dom";

const Find_id = () => {
  const navigate = useNavigate();

  const navigateToBack = () => {
    navigate("/");
  };

  return (
    <div className="box">
      <form method="post" className="find_id_form">
        <fieldset className="inner_id_form">
          <legend className="find_id_title">아이디 찾기</legend>
          <div className="phone_section">
            <span className="subtitle3">e-mail : </span>
            <input
              type="text"
              name="phone"
              className="phone1"
              placeholder="이메일을 입력해주세요"
            ></input>
            <button type="button" className="find_id_form_btn">
              확인
            </button>
          </div>
        </fieldset>
        <button type="button" className="find_id_btn" onClick={navigateToBack}>
          로그인화면으로
        </button>
      </form>
    </div>
  );
};

export default Find_id;
