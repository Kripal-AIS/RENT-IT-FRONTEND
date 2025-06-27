import React from 'react'
import { Link } from 'react-router-dom'
import errorGIF from '../imgs/404.gif'

export default function ErrorPage() {
  return (
    <div className='page flex-col errorPage'>

        <img src={errorGIF} alt="" />
        <h1>Can't Found This Page</h1>
        <Link to='/'>Go back to home</Link>
    </div>
  )
}
