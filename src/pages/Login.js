import React, { useState } from "react";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import LoginGIF from "../imgs/login.gif";
import axios from "axios";
import { API } from '../API';
import { useDispatch } from "react-redux";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { motion } from 'framer-motion';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(`${API}/auth/login`, {
        username,
        password
      }, { withCredentials: true });

      const userData = res.data;

      // Save to Redux
      dispatch({ type: "LOGIN", payload: userData });

      // Save to localStorage for persistence
      localStorage.setItem("user", JSON.stringify(userData));

      navigate('/');
    } catch (e) {
      console.error("Login error:", e);
      alert(e?.response?.data || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div className="login flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="left flex-col">
        <Logo />

        <div className="form flex-col">
          <div className="flex-col">
            <div>
              <p>Username:</p>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="passwordFeild">
              <p>Password:</p>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <VisibilityIcon className="i" onClick={() => setShowPassword(!showPassword)} />
            </div>

            <Link to="/sendemail" className="fgtp">Forgot password</Link>

            <button className="blue" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </button>
          </div>

          <Link to="/signup">Create a new account</Link>
        </div>
      </div>

      <div className="right flex-col">
        <img src={LoginGIF} alt="Login illustration" className="img" />
        <div>
          <h1>Welcome Back</h1>
          <p>Login to your account to see your data</p>
        </div>
      </div>
    </motion.div>
  );
}
