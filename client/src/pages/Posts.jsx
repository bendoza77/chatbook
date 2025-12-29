import { useEffect, useState } from "react";
import Post from "../components/Post";
import { usePost } from "../context/PostContext";

const Posts = () => {

    const { posts } = usePost();
    const { getPosts } = usePost();
    const { page } = usePost();

    useEffect(() => {
        getPosts();
    }, [page])


    return (
        <>
            <div className="posts">
                <h1>The posts</h1>
                {posts.map(el => {
                    return <Post el={el} />
                })}
            </div>
        </>
    );


}

export default Posts