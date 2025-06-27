import React from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
export default function Star({count,setCount}) {


  return (
    <div>
        {
            [1,2,3,4,5].map(i=>(
            (i<=count)?

            <StarIcon  sx={{fontSize:30}} onClick={()=>{
                if(setCount)
                setCount(i)
            }} />
            :
            <StarBorderIcon  sx={{fontSize:30}} onClick={()=>{
              if(setCount)
              setCount(i)}} />
            )
            
            )
        }

    </div>
  )
}
