import React, { useState } from 'react'
import Logo from '../components/Logo'
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../API';

export default function ChangePassword() {

  const {token} = useParams();
  const [password,setPassword] = useState("")
  const [cpassword,setCPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const resetPassword = async() =>{
    if(password === cpassword && password != ""){

      setIsLoading(true)
      const reqBody = {
        resetPassword:password,
        retypePassword:cpassword,
        token
      }

      try{

        const res = await axios.put(API+'/auth/reset_password',reqBody)
        if(res.status ===200){
          alert("password is reset now try to login again ")
          navigate('/login')
        }
        else{
          alert("Error Occured")
        }
      }
      catch(e){
        alert("Error Occured")
      }
      setIsLoading(false)
    }
  }
  return (
    <div className="sendemail flex-col">
      <Logo />
      <h2>Change Password</h2>
      <div className="title">
        <p>Password : </p>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </div>

      <div className="title">
        <p>Confirm Password : </p>
        <input type="password" value={cpassword} onChange={(e)=>setCPassword(e.target.value)} />
      </div>
      <button className="blue" onClick={resetPassword} disabled={!(password === cpassword && password != "")}>
        { isLoading ? "Loading ..." : "Update Password"}
      </button>
    </div>
  )
}
