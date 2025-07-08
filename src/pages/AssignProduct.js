import { async } from '@firebase/util';
import axios from 'axios';
import React, { useEffect, useId, useState } from 'react'
import Select from 'react-select'
import { API } from '../API';
import { useLocation, useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'
export default function AssignProduct() {

    const [options,setOptions] = useState([]);
    const [userID,setuserID] = useState([]);
    const [due,setdue] = useState();

    const [product,setProduct] = useState();
    const location = useLocation();
    const navigate = useNavigate();


    const fetchUsers = async() =>{
        const res = await axios.get(API + '/user/findall')
        const temp = [];

        if(res.status ===200 )
        {
            const filteredData = res.data.filter(d => d._id !== product?.ownerid && !d.isAdmin);
            filteredData.map(d=>temp.push({

                value:d._id,
                label:<div className='list'><img src={d.avatar} className="imageINLIST"/>{d.username}</div>
            }))
            
            setOptions(temp);
        }

    }

    const handleSubmit = async() =>{

        if(userID && due){
            const reqBody = {
                productid : product._id,
                borrowerid : userID,
                revokedate : due
            }

            try{

                const res = await axios.post(API + '/product/assign' ,reqBody , {withCredentials : true}) 

                if(res.status === 200){
                    navigate(`/product/${product._id}`)
                }
            }
            catch(e){
                alert("Product is not Assigned")
            }
        }
        else{
            alert("Fill the Details")
        }


    }


    useEffect(()=>{
        setOptions([])
        fetchUsers();

    },[])

    useEffect(()=>{
        setProduct(location.state)
    },[location])


  return (
    <motion.div className='page assignproductpage'
    initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{duration:.2}}
    >
        <h2>Assign Product</h2>


        <div className='flex-col'>
            <div className="form flex-col" >
                
                <div className="inp">
                    <p>Username : </p>
                    <Select options={options} onChange={(selectedOptions) => setuserID(selectedOptions.value)}/>
                </div>
            
                <div className="inp">
                    <p>Assign Till :</p>
                    <input type="date" value={due} onChange={(e)=>setdue(e.target.value)}/>
                </div>
            
            
            </div>

            <button className='green' onClick={handleSubmit}>Assign</button>
        </div>



    </motion.div>
  )
}
