import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { API } from '../API';
import Star from '../components/Star';
import {motion} from 'framer-motion'
import CancelIcon from '@mui/icons-material/Cancel';
export default function AddReview(props) {

  const user = useSelector((state)=>state.auth)
  const location = useLocation()
  const [product,setProduct] = useState()
  const [star,setStar] = useState(0)
  const [review,setReview] = useState();
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false)
  useEffect(()=>{
    if(props.product)
    setProduct(props.product);
  },[props])

  const addReview = async() =>{
    setIsLoading(true)
    if(review && star){

      try{
        const reqBody = {
          productid:product._id,
          rating:star,
          review,
          username:user.username
        }
       const res= await axios.post(API+'/review/create',reqBody,{withCredentials:true})

       navigate(`/product/${product._id}`);
      }
      catch(e){
        alert(e.response.data)
        console.log(e);
      }
    }
    else{
      alert("pass all details")
    }

    setIsLoading(false)
    
  }
  
  return (
    <motion.div className='page addreview flex-col'>
      <div className='cross' onClick={()=>props.closeModel(false)}>
        <CancelIcon sx={{fontSize:30}} />
          <h2>Add Review</h2>
        </div>

      <div className="form flex-col">
        <div className="inp">
          <label htmlFor="message">Review</label>
          <textarea type="text" id="message" rows={4} value={review} onChange={(e)=>setReview(e.target.value)}></textarea>
        </div>

        <div className="inp">
          <label htmlFor="star">Rating</label>
          <Star count={star} setCount={setStar}/>
        </div>

        <button className='blue' onClick={addReview}>{isLoading ? "Loading ..." :"Add Review"}</button>

      </div>


    </motion.div>
  )
}
