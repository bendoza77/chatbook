import { useState } from "react";
import { usePost } from "../context/PostContext";
import { useLocation } from "react-router-dom";

const Post = ({el}) => {

    const [toggle, setToggle] = useState(false);
    const { updatePost } = usePost();
    const location = useLocation();

    const handleSubmit = (e, postId) => {
        e.preventDefault();

        const data = {
            title: e.target.title.value,
            content: e.target.content.value
        };

        updatePost(data, postId);
        setToggle(false);

    }

    return (
        <>
            {toggle ? (
                <form onSubmit={(e) => handleSubmit(e, el._id)}>
                    <input type="text" name="title" placeholder="Change Title" />
                    <input type="text" name="content" placeholder="Content" />

                    <button  >Submit</button>
                    <button onClick={() => setToggle(false)} >Cancel</button>
                </form>
                ) : (
                    <>
                        <div key={`post ${el._id}`} className="post">
                            <div className="title">
                                <p>{el.fullName}</p>
                                <h1>{el.title}</h1>
                            </div>
                            <p className="content">{el.content}</p>
                            <div className="like">
                                <p>likes</p>
                                <p>${el.likeCount}</p>
                            </div>
                            {(!toggle && location.pathname === "/profile")  && <button onClick={() => setToggle(!toggle)}>Update post</button>}
                        </div> 
                    </>
                )
            }
        </>
    );



}

export default Post