import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { API } from '../API';
import Logo from '../components/Logo';
import { useDispatch } from 'react-redux';
import logout from '../helpers/logout';
import {motion} from 'framer-motion'
export default function VerifyEmail() {

  let { token } = useParams();
  const dispatch = useDispatch();

  const [message,setMessage] = useState("Loading ...")
    useEffect(()=>{
        axios.get(API+`/auth/verify_email?verify_email_token=${token}`).then(()=>{
            setMessage("Verified")
            logout(dispatch);
            
        }).catch(()=>{
            setMessage("Error Occured")
        })
    },[])
  return (
    <motion.div className='fullpage flex-col'
    initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{duration:.2}}
    >
        <Logo/>
        <h1>
        VerifyEmail
        </h1>
        <p>{message}</p>
        
    </motion.div>
  )
}
