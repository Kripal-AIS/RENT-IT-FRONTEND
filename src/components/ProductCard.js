import React from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'
import Star from "./Star";
import { useState } from "react";
import { useEffect } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useSelector } from "react-redux";

export default function ProductCard(props) {

  const [imgLoading, setImgLoading] = useState(true)
  const user = useSelector((state) => state.auth);
  
  const navigate = useNavigate();
  const openProduct = () =>{
    navigate(`/product/${props._id}`)
  }
  if (props) return <><motion.div 
  onClick={openProduct} className="prodCard ">

    <h3>{props.title}</h3>
    {/* <div className="img"> */}
       <img key={props.title} src={props.image} alt="" />
    {/* </div> */}

    <p className="price">{props.rent}{"₹ "}{props.timeperiod}</p>
    <p>{props.category}</p>

    <p className="location"><LocationOnIcon />{props.location}</p>
    <p> <Star count={props.rating}/> </p>
    {console.log(props)}
    {/* {user?.isAdmin && <p className="location"><p/>} */}
  </motion.div>
  </>
  ;

  return <></>;
}
