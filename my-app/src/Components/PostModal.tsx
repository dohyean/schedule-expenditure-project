import React, { useState } from "react";
import "../Style/PostModal.css";

// Define FormValues type
interface FormValues {
    name: string;
    date: string;
    title: string;
    content: string;
}

interface PostItem {
    id: number;
    name: string;
    date: string;
    title: string;
    content: string;
}

interface PostModalProps {
    selectedData: PostItem;
    handleCancel: () => void;
    handleEditSumit: (data: PostItem) => void;
}

const PostModal: React.FC<PostModalProps> = ({
    selectedData,
    handleCancel,
    handleEditSumit,
}) => {
    const [isHovering, setIsHovering] = useState(false);
    const [edited, setEdited] = useState(selectedData);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    const onCancel = () => {
        handleCancel();
    };

    const onEditedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEdited({
            ...edited,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        handleEditSumit(edited);
    };

    return (
        <div className="list">
            <div className="list_box">
                <div className="list_border">
                    <h4 className="h4">게시글 정보 수정하기</h4>
                    <i className="fas fa-items cursor-pointer" onClick={onCancel}></i>
                </div>
                <form onSubmit={onSubmitEdit}>
                    <div className="p-3">
                        <div>ID: {edited.id}</div>
                        <div>
                            작성자:{" "}
                            <input
                                className="contents2"
                                type="text"
                                name="name"
                                value={edited.name}
                                onChange={onEditedChange}
                            />
                        </div>
                        <div>
                            작성날짜:{" "}
                            <input
                                className="contents2"
                                type="date"
                                name="date"
                                value={edited.date}
                                onChange={onEditedChange}
                            />
                        </div>
                        <div>
                            제목:{" "}
                            <input
                                className="contents2"
                                type="text"
                                name="title"
                                value={edited.title}
                                onChange={onEditedChange}
                            />
                        </div>
                        <div>
                            작성내용:{" "}
                            <input
                                className="contents2"
                                type="text"
                                name="content"
                                value={edited.content}
                                onChange={onEditedChange}
                            />
                        </div>
                    </div>
                    <div className="btn_func">
                        <button
                            className={isHovering ? "cancel_btn_hover" : "cancel_btn"}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                            onClick={onCancel}
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className={isHovering ? "modify_btn_hover" : "modify_btn"}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                            onClick={onCancel}
                        >
                            수정
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostModal;
