import { useState } from "react";
import { useEffect } from "react";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const API_URL = import.meta.env.VITE_CLIENT_URL

const AuthProvider = ({children}) => {

    const navigate = useNavigate();
    const [user, setUser] = useState({});
    
    const logout = async () => {

        try {

            const req = await fetch(`${API_URL}/auth/logout`, {
                method: "POST",
                credentials: "include"
            })

            const res = await req.json();

            if (!req.ok) {
                throw new Error("Token is not deleted");
            }

            alert(res.message);
            setUser({});
            navigate("/login");

        } catch (error) {
            console.log(error);
        }


    }

    useEffect(() => {

        const authoLogin = async () => {
            try {
                const request = await fetch(`${API_URL}/auth/autho-login`, {
                    method: "POST",
                    credentials: "include"
                });
                const result = await request.json();

                if (!request.ok) {
                    throw new Error("User is not login");
                }

                setUser(result.data.user);
                navigate("/profile")
                
            } catch (error) {
                console.log(error);
            }
        }

        authoLogin();


    }, [])

    const login = async (formObj) => {

        try {

            const request = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formObj),
                credentials: "include"
            });
            const result = await request.json();
            console.log(result);

            if (!request.ok) {
                alert(result.message);
            }

            setUser(result.data.user);
            navigate("/profile")


        } catch(error) {
            console.log(error);
        }

    }

    const signup = async (formObj) => {

        try {

            const request = await fetch(`${API_URL}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formObj),
                credentials: "include"
            });

            const result = await request.json();

            if (!request.ok) {
                throw new Error("Cant sign up")
            }

            setUser(result.data.user);
            alert(result.message)
            navigate("/profile")

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <AuthContext.Provider value={{signup, login, user, logout}}>
                {children}
            </AuthContext.Provider>
        </>
    );

}

export { useAuth, AuthProvider }