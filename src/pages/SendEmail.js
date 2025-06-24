import axios from "axios";
import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import { API } from "../API";
import {motion } from 'framer-motion'
export default function SendEmail() {
  const [message, setMessage] = useState();
  const [email, setEmail] = useState();
  const sendForgotPasswordEmail = async () => {
    setMessage("Hang in there...")

    try{

      const res = await axios.post(API + "/auth/send_reset_email",{email});

      if(res.status === 200){
        setMessage("We have Sent You an email check that out.")
      }
    }
    catch(e){
      setMessage("Oops Error occured !!")
    }
  };
  useEffect(() => {}, []);
  return (
    <motion.div className="sendemail flex-col"
    initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{duration:.2}}
    >
      <Logo />

      {message || (
        <>
          <label htmlFor="email">
            Forgot password ? Don't worry Just Enter Your email
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="blue" onClick={sendForgotPasswordEmail}>Send</button>
        </>
      )}

      
    </motion.div>
  );
}
