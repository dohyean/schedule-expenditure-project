import '../Style/Post.css';
import Login from './Login';

function Post() {
    return (
        <div className='body_box'>
            <div className="left_box">
                <div className="main_area">
                    <div className="post_area">
                        <h1>공지사항</h1>
                        <textarea></textarea>
                    </div>
                    <div className="complain_area">
                        <h1>불만사항</h1>
                        <textarea></textarea>
                    </div>
                </div>
            </div>
            <Login />
        </div>
    )   
}

export default Post;