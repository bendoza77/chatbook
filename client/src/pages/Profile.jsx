import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { usePost } from "../context/PostContext";
import Post from "../components/Post";

const Profile = () => {

    const { user } = useAuth();
    const { createPost, getPosts, posts, deletePost} = usePost();

    useEffect(() => {
        getPosts(user._id)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();


        const formData = new FormData();
        formData.append("title", e.target.postTitle.value);
        formData.append("content", e.target.postDes.value);
        formData.append("postImg", e.target.postImg.files[0]);


        createPost(formData);
        e.target.reset();

    }


    return (
        <>
            <div className="profile">
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Verified: {user.isVerified ? "Yes" : "No"}</p>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input type="text" name="postTitle" placeholder="Post Title" />
                    <input type="text" name="postDes" placeholder="Post Description" />
                    <input type="file" name="postImg" />
                    <button>Create Post</button>
                </form>

                <div className="my_posts">
                    {posts.map(el => {
                        return (
                            <>
                                <Post el={el} />
                                { el.userId === user._id && <button onClick={() => deletePost(el._id)}>Delete post</button>}
                            </>
                        );
                    })}
                </div>
            </div>
        </>
    );



}

export default Profile