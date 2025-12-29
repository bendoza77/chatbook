import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Singup from "./pages/Signup";
import Nav from "./components/Nav";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Posts from "./pages/Posts";
import Users from "./pages/users";

const App = () => {

  return (
    <>
    <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/profile" element={<ProtectedRoute>
          <Profile />
        </ProtectedRoute>} />
        <Route path="/posts" element={<ProtectedRoute>
          <Posts />
        </ProtectedRoute>} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  );



}

export default App
