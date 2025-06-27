import React from 'react'

export default function QueryCard(props) {

    if(props)
  return (
    <div className='queryCard green'>
        <h3>{props.title}</h3>
        <p className='description'>{props.description}</p>
        <div className="bottom">
            <img src={props.avatar} alt="" />
            <b>{props.username}</b>

            
        </div>
    </div>
  )
}
