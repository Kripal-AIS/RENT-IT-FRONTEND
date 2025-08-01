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
import Select from 'react-select'

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
  const [biddingAcceptingTimeConfiguration, setBiddingAcceptingTimeConfiguration] = useState();
  const options = [
    { value: "0.5", label: "30 minutes" },
    { value: "1", label: "1 hour" },  
    { value: "2", label: "2 hours" },
    { value: "3", label: "3 hours" },
    { value: "4", label: "4 hours" },
    { value: "5", label: "5 hours" },
    { value: "6", label: "6 hours" },
    { value: "12", label: "12 hours" },
    { value: "24", label: "24 hours" },
  ]
  useEffect(() => {
    if (user) {

      setUsername(user.username)
      setEmail(user.email)
      setCity(user.location)
      setMobile(user.mobile)
      setPreview(user.avatar)
      if (user.biddingAcceptingTimeConfiguration) {
        setBiddingAcceptingTimeConfiguration(
          (user.biddingAcceptingTimeConfiguration / 60).toString() // convert minutes to hours string
        );
      }
    }
  }, [user])

  const handleFile = (e) => {
    setImg(e.target.files[0]);
  };
  const fileSelect = () => {
    if (img) setPreview(URL.createObjectURL(img));
  };


  const verifyEmail = async () => {
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
      avatar: img,
      biddingAcceptingTimeConfiguration: parseFloat(biddingAcceptingTimeConfiguration) * 60


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
    <motion.div
      className="editProfile page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex-bet">
        <h2>Edit Profile</h2>
        <button className="red" onClick={() => logout(dispatch)}>
          Logout
        </button>
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
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="title">
              <div className="p flex">
                Email :
                <div className="isVerified " title="Verify your email address">
                  {user.emailverified ? (
                    <VerifiedIcon
                      sx={{ fontSize: 20 }}
                      style={{ color: "#05396B" }}
                    />
                  ) : (
                    <button
                      className={
                        emailSent ? `green notverified` : `yellow notverified`
                      }
                      onClick={verifyEmail}
                    >
                      {" "}
                      <VerifiedIcon
                        sx={{ fontSize: 20 }}
                        style={
                          emailSent
                            ? { color: "#53C249" }
                            : { color: "#C28949" }
                        }
                      />
                      {emailSent
                        ? "Verification Email Sent"
                        : "Click to Verify"}
                    </button>
                  )}
                </div>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="title">
              <p>Bidding Accepting Time Configuration : </p>
              <Select
                options={options}
                onChange={(selectedOptions) =>
                  setBiddingAcceptingTimeConfiguration(selectedOptions.value)
                }
                value={
                  options.find(
                    (option) =>
                      option.value === biddingAcceptingTimeConfiguration
                  ) || null
                }
              />
            </div>
          </div>
          <div className="right">
            <div className="title">
              <p>Location (city) : </p>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="title">
              <div className="p flex">
                Mobile :
                <div
                  className="isVerified "
                  title="Verify your Mobile number "
                ></div>
              </div>
              <input
                type="number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <button className="blue" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Loading ..." : "Edit Profile"}
        </button>
      </div>
    </motion.div>
  );
}

