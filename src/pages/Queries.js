import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { API } from '../API'
import QueryCard from '../components/QueryCard'
import {motion} from 'framer-motion'
export default function Queries() {

  const [title,setTitle] = useState()
  const [description,setDescription] = useState()

  const [queries,setQueries] = useState([])


  const fetchQuery = async() =>{

    try{
      const res = await axios.get(API+'/query/all');
      if(res.status === 200){
        setQueries(res.data)

        console.log(res.data);
      }
    }
    catch(e){

    }
  }
  useEffect(()=>{
    fetchQuery()
  },[])

  const addQuery = async() =>{
    if(title && description){


      try{

        const reqBody = {
          title,
          description
        }
        const res = await axios.post(API+'/query/add',reqBody,{withCredentials:true})

        if(res.status===200){
          window.location.reload()
        }

        
      }
      catch(e){
        alert("error")
      }
    }
  }
  return (
    <motion.div className='queries page'
    initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{duration:.2}}
    >
      <h2>Queries</h2>
      <div className='wrapper'>
        
        <div className="left">
            <div className="form">
            <div className="title">
              <p>Name : </p>
              <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
        
            <div className="description">
              <p>Description : </p>
              <textarea type="text" rows={5} value={description} onChange={(e)=>setDescription(e.target.value)} ></textarea>
            </div>
        
            <button className='yellow' onClick={addQuery}> Add Query</button>
        
        
            </div>
        </div>
        <div className="right">

          {
            queries.map(q=><QueryCard {...q} />)
          }


        
        </div>
      </div>
    </motion.div>
  )
}
