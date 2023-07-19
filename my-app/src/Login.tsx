import './Login.css';

function Login() {
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
                        <button type="submit" className="login_btn">로그인</button>
                    </form>
                </div>
                <div className="login_option">
                    <form method="get" className="option1">
                        <button type="submit" className="option1_inner">아이디</button>
                    </form>
                    <form method="get" className="option2">
                        <button type="submit" className="option2_inner">비밀번호</button>
                    </form>
                    <form method="get" className="option3">
                        <button type="submit" className="option3_inner">회원가입</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;