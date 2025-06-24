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

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [showPassword, setShowPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = async () => {
    // if(username &&password){
    setIsLoading(true)
    const reqBody = {
      username, password
    }
    try {
      const res = await axios.post(API + '/auth/login', reqBody, { withCredentials: true })

      const data = res.data;
      dispatch({ type: "LOGIN", payload: data })
      navigate('/')

      console.log(data);
    }
    catch (e) {
      alert(e.response.data)
    }



    // }

    setIsLoading(false)
  }
  return (
    <motion.div className="login flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .2 }}
    >
      <div className="left flex-col">
        <Logo />

        <div className="form flex-col">
          <div className="flex-col">
            <div>
              <p>Username : </p>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div className="passwordFeild">
              <p>Password : </p>
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
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
        <img src={LoginGIF} alt="" className="img" />
        <div>
          <h1>Welcome Back</h1>
          <p>Login to your account to see your data</p>
        </div>
      </div>
    </motion.div>
  );
}
