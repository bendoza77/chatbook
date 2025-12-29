import { useAuth } from "../context/AuthContext";

const Login = () => {

    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();

        const { userEmail, userPassword } = e.target

        const obj = {
            email: userEmail.value,
            password: userPassword.value
        }

        login(obj);


    }

    return (
        <>
            <div className="login">
                <form onSubmit={handleSubmit}>
                    <input type="email" name="userEmail" placeholder="Enter Your Email" />
                    <input type="passwrod" name="userPassword" placeholder="Enter Your Password" />
                    <button>Submit</button>
                </form>
            </div>
        </>
    );



}

export default Login