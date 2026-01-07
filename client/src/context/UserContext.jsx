import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const useUser = () => useContext(UserContext);

const API_URL = "http://localhost:3000"


const UserProvider = ({children}) => {

    const [ users, setUsers ] = useState([]);

    const getUsers = async () => {

        try {

            const req = await fetch(`${API_URL}/users/`, {
                credentials: "include"
            })
            
            const res = await req.json();

            if (!req.ok) {
                throw new Error("Users not found");
            }

            setUsers(res);

        } catch (error) {
            console.log(error);
        }



    }

    return (
        <>
            <UserContext.Provider value={{users, getUsers}}>
                {children}
            </UserContext.Provider>
        </>
    );

}

export { useUser, UserProvider }