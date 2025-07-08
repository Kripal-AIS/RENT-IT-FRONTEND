import React from 'react'
import Star from './Star'

export default function ReviewCard(props) {


    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
    function formatDate(date) {
        return [
          padTo2Digits(date.getDate()),
          padTo2Digits(date.getMonth() + 1),
          date.getFullYear(),
        ].join('/');
      }
  return (
    <div className='blue  reviewCard'>
        <h3>{props.review}</h3>
        <div className="star">
            <Star count={props.rating} />
        </div>
        <div className="bottom">
            <b>by - {props.username}</b>
            <p>{formatDate(new Date( props.createdAt))}</p>
        </div>
    </div>
  )
}
