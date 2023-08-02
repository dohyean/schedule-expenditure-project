import "../Style/Login.css";
import * as React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const navigateToFindid = () => {
    navigate("/find_id");
  };

  const navigateToFindpw = () => {
    navigate("/find_pw");
  };

  const navigateToCreate = () => {
    navigate("/create");
  };

  return (
    <div className="right_box">
      <div className="login_form">
        <div className="login_top_section">
          <div className="login_input_section">
            <input
              type="text"
              name="id"
              placeholder="아이디"
              className="login_id"
            ></input>
            <input
              type="password"
              name="pass"
              placeholder="비밀번호"
              className="login_password"
            ></input>
          </div>
          <form method="get">
            <button type="submit" className="login_btn">
              로그인
            </button>
          </form>
        </div>
        <div className="login_option">
          <form method="get" className="option1">
            <button
              type="submit"
              className="option1_inner"
              onClick={navigateToFindid}
            >
              아이디
            </button>
          </form>
          <form method="get" className="option2">
            <button
              type="submit"
              className="option2_inner"
              onClick={navigateToFindpw}
            >
              비밀번호
            </button>
          </form>
          <form method="get" className="option3">
            <Link to="/create">
              <button
                type="submit"
                className="option3_inner"
                // onClick={navigateToCreate}
              >
                회원가입
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
