import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Nav = () => {

    const { user, logout } = useAuth();
    const length = Object.keys(user).length

    return (
        <>
            <header>

                <div className="logo">
                    <img src="./src/assets/ChatGPT Image Dec 25, 2025, 03_45_16 PM.png" alt="" />
                </div>


                <div className="navigations">
                    <Link style={{textDecoration: "none"}} to={"/"}><p>Home</p></Link>
                    {length === 0 && <Link style={{textDecoration: "none"}} to={"/login"}><p>Login</p></Link>}
                    {length === 0 && <Link style={{textDecoration: "none"}} to={"/signup"}><p>Sign Up</p></Link>}
                    {length !== 0 && <Link style={{textDecoration: "none"}} to={"/profile"}><p>Profile</p></Link>}
                    {length !== 0 && <Link style={{textDecoration: "none"}} to={"/posts"}><p>Posts</p></Link>}
                    {length !== 0 && <Link style={{textDecoration: "none"}} to={"/users"}><p>Users</p></Link>}
                    {length !== 0 && <p onClick={logout}>Logout</p>}
                </div>
            </header>
        </>
    );

}

export default Nav