import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Posts from "./pages/Posts";
import Users from "./pages/Users";

const App = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Nav />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/posts" element={<ProtectedRoute><Posts /></ProtectedRoute>} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
