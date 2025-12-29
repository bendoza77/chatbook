import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({children}) => {

    const { user } = useAuth();

    if (Object.keys(user).length === 0) {
        return <Navigate to={"/login"} />
    }

    return children

}

export default ProtectedRoute