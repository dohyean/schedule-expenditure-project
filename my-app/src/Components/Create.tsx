import React from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const navigate = useNavigate();

    const navigateToBack = () => {
        navigate("/");
    };

    return (
        <div className="box">
                    <form method="post" className="create_form">
                        <fieldset className="inner_form">
                            <legend className="title">회원가입</legend>
                            <div className="id_title">
                                <span className="subtitle1">아이디 : </span>
                                <div className="id_section">
                                    <input type="text" name="id" className="id" placeholder="아이디를 입력해주세요"></input>
                                    <button className="id_check_btn">중복</button>
                                </div>
                            </div>
                            <div>
                                <span className="subtitle">비밀번호 : </span>
                                <input type="password" name="pw" className="pw" placeholder="비밀번호를 입력해주세요"></input>
                            </div>
                            <div>
                                <span className="subtitle1">이름 : </span>
                                <input type="text" name="name" className="name" placeholder="이름을 입력해주세요"></input>
                            </div>
                            <div>
                                <span className="subtitle">전화번호 : </span>
                                <input type="text" name="phone" className="phone" placeholder="전화번호를 입력해주세요"></input>
                            </div>
                            <div>
                                <span className="subtitle">주민번호 : </span>
                                <input type="text" name="SSN" className="SSN" placeholder="주민번호를 입력해주세요"></input>
                            </div>
                            <div>
                                <span className="subtitle">e-mail : </span>
                                <input type="text" name="email" className="email" placeholder="이메일을 입력해주세요"></input>
                            </div>
                        </fieldset>
                        <button className="create_btn" onClick={navigateToBack}>확인</button>
                    </form>
                </div>
    )
}

export default Create;
