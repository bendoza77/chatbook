import { createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext();

const usePost = () => useContext(PostContext);

const API_URL = import.meta.env.VITE_CLIENT_URL

const PostProvider = ({children}) => {

    const [posts, setPosts] = useState([]);

    const updatePost = async (data, postId) => {


        try {
            const req = await fetch(`${API_URL}/posts/${postId}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })


            if (!req.ok) {
                throw new Error("update failed");
            }

            const res = await req.json();

            setPosts(prev => {
                return prev.map(el => {
                    return el._id === postId ? res : el
                })
            })


        } catch (error) {
            console.log(error);
        }

    }
    
    const getPosts = async (userId) => {

        try {

            const req = await fetch(`${API_URL}/posts${userId ? `?userId=${userId}` : ""}`,
                { credentials: "include" }
            );
            const res = await req.json();

            setPosts(res.data.posts);


        } catch (error) {
            console.log(error);
        }
    }

    const deletePost = async (postId) => {

        try {

            const req = await fetch(`${API_URL}/posts/${postId}`, {
                method: "DELETE",
                credentials: "include"
            })

            if (!req.ok) {
                throw new Error("Somthing is wrong");
            }

            setPosts(posts.filter(el => el._id !== postId));

        } catch(error) {
            console.log(error);
        }


    }

    const createPost = async (postObj) => {

        try {

            const request = await fetch(`${API_URL}/posts/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postObj),
                credentials: "include"
            })

            const result = await request.json();
            setPosts(prev => {
                return [...prev, result];
            })


        } catch (error) {
            console.log(error);
        }


    }

    return (
        <>
            <PostContext.Provider value={{ createPost, posts, getPosts, deletePost, updatePost }}>
                {children}
            </PostContext.Provider>
        </>
    );


}

export { PostProvider, usePost }