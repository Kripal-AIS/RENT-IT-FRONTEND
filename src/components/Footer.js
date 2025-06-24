import React from "react";
import Logo from "./Logo";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailIcon from '@mui/icons-material/Mail';
export default function Footer() {
  const user = useSelector((state) => state.auth);

  return (
    <div className="padd footer">

      <div className="top">

      
      <div className="left">
        <Logo />
      </div>
      <div className="mid">
      <div className="bottom flex">
      <p>
        © All rights are reserved 2022-23
        </p> 
      </div>
      </div>
      <div className="end ">


        
        <TwitterIcon sx={{fontSize:30}}/>
        <InstagramIcon sx={{fontSize:30}} />
        <MailIcon  sx={{fontSize:30}}/>
        
      </div>

      </div>

      
    </div>
  );
}
