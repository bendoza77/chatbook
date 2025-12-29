import { useAuth } from "../context/AuthContext";

const Singup = () => {

    const { signup } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();

        const { userName, userEmail, userPassword } = e.target

        const obj = {
            name: userName.value,
            email: userEmail.value,
            password: userPassword.value
        }

        signup(obj);


    }

    return (
        <>
            <div className="signup">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="userName" placeholder="Enter Your Name" />
                    <input type="email" name="userEmail" placeholder="Enter Your Email" />
                    <input type="password" name="userPassword" placeholder="Enter Your Password" />
                    <button>Submit</button>
                </form>
            </div>
        </>
    );


}

export default Singup