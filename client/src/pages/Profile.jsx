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

        const { postTitle, postDes } = e.target

        const obj = {
            title: postTitle.value,
            content: postDes.value
        }

        createPost(obj);
        e.target.reset();

    }


    return (
        <>
            <div className="profile">
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Verified: {user.isVerified ? "Yes" : "No"}</p>

                <form onSubmit={handleSubmit}>
                    <input type="text" name="postTitle" placeholder="Post Title" />
                    <input type="text" name="postDes" placeholder="Post Description" />
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