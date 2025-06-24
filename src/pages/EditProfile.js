import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { API } from "../API";
import axios from "axios";
import firebaseUpload from '../helpers/firbaseUpload';
import { motion } from 'framer-motion'
import logout from "../helpers/logout";
import VerifiedIcon from '@mui/icons-material/Verified';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function EditProfile() {
  const [img, setImg] = useState();
  const [preview, setPreview] = useState();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState("");
  const [emailSent, setEmailSent] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth)

  useEffect(() => {
    if (user) {

      setUsername(user.username)
      setEmail(user.email)
      setCity(user.location)
      setMobile(user.mobile)
      setPreview(user.avatar)

    }
  }, [user])

  const handleFile = (e) => {
    setImg(e.target.files[0]);
  };
  const fileSelect = () => {
    if (img) setPreview(URL.createObjectURL(img));
  };

  const verifyMobile = () => {

    // axios.get('/')
    navigate('/enterOTP', { state: "Mobile" })
  }

  const verifyEmail = async () => {
    // navigate('/enterOTP',{state:"Email"})
    try {


      const res = await axios.get(API + '/auth/send_verification_email', { withCredentials: true })
      setEmailSent(true)
    }
    catch (e) {
      alert("Error", e)
      console.log(e);
    }
  }





  const updateUser = async (img = preview) => {

    setLoading(true)
    const reqData = {
      username,
      email,
      mobile,
      location: city,
      avatar: img

    }

    try {

      const res = await axios.put(API + `/user/${user._id}`, reqData, { withCredentials: true })
      logout(dispatch)

    }
    catch (e) {
      alert("error")
    }

    setLoading(false)
  }
  const handleSubmit = async() => {

    setLoading(true)
    if (img) {

      await firebaseUpload(img, user._id, (img) => {
        updateUser(img.data)
      })
    }
    else {
      await updateUser(preview)
    }


  }

  useEffect(() => {
    fileSelect();
  }, [img]);



  return (
    <motion.div className="editProfile page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .2 }}
    >
      <div className="flex-bet">
        <h2>Edit Profile</h2>
        <button className="red" onClick={() => logout(dispatch)}>Logout</button>
      </div>

      <div className="form">
        <div className="top flex">
          <div className="avatarWrap">
            <p>Avatar :</p>
            {!preview ? (
              <div className="avatar"></div>
            ) : (
              <img src={preview || ""} className="avatar" alt="" />
            )}

            <label htmlFor="avatarimg" className="blue">
              <CloudUploadIcon sx={{ fontSize: 30 }} />

            </label>
            <input id="avatarimg" type="file" onChange={(e) => handleFile(e)} />
          </div>
        </div>

        <div className="bottom">
          <div className="left">
            <div className="title">
              <p>Name : </p>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="title">
              <div className="p flex">Email :
                <div className="isVerified " title="Verify your email address">
                  {
                    user.emailverified ?
                      <VerifiedIcon sx={{ fontSize: 20 }} style={{ color: "#05396B" }} />
                      : <button className={emailSent ? `green notverified` : `yellow notverified`} onClick={verifyEmail}> <VerifiedIcon sx={{ fontSize: 20 }} style={emailSent ? { color: "#53C249" } : { color: "#C28949" }} />{emailSent ? "Verification Email Sent" : "Click to Verify"}</button>}
                </div>

              </div>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="right">
            <div className="title">
              <p>Location (city) : </p>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="title">
              <div className="p flex">Mobile :
                <div className="isVerified " title="Verify your Mobile number ">
                </div>

              </div>
              <input type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <button className="blue" onClick={handleSubmit} disabled={isLoading}>{isLoading ? "Loading ..." : "Edit Profile"}</button>
      </div>
    </motion.div>
  );
}

