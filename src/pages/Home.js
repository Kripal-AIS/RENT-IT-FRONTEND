import React from 'react'
import Hero from '../imgs/hero.png'
import {motion} from "framer-motion"
import { Link } from 'react-router-dom'
import PaymentsIcon from '@mui/icons-material/Payments';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import ChatIcon from '@mui/icons-material/Chat';
import TourIcon from '@mui/icons-material/Tour';
export default function Home() {
  return (
    <motion.div className='page home'
    initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{duration:.2}}
    >
      <div className="top flex-col hero" style={{backgroundImage: `url(${Hero})`}}>
          <h1>
            Get The Goods that You need
          </h1>
          <Link className='blue exploreBtn' to='/explore'>
            Explore Now
          </Link>
      </div>
      <div className="bottom">


          <h2>Why Borrowing instead of purchasing ?</h2>
          <div className="why flex">
            <div className="card yellow">
              <PaymentsIcon sx={{fontSize:120}}/>

              <b>No initial costs</b>
              <p>
                Renting a product means you don't have to pay the money for purchasing it. Means you dont have to make initial investment.
              </p>
            </div>

            <div className="card yellow">
              <EngineeringIcon sx={{fontSize:120}}/>

              <b>No Maintenance costs</b>
              <p>
                After Purchasing a product you may need to maintain it, if you are having it for a long time. But by renting it you can save some of that pennies.
              </p>
            </div>

            <div className="card yellow">
              <PrecisionManufacturingIcon sx={{fontSize:120}}/>

              <b>For Trial purpose</b>
              <p>
                If You want a product just to try out then Renting it can be an easy way than directly purchasing it.
              </p>
            </div>


          </div>


          <h2>How it works ?</h2>
          <div className="how flex">


          <div className="card green">
              <TravelExploreIcon sx={{fontSize:120}}/>

              <b>Find the product you need</b>
              <p>
                  Search for the product on this platform.

              </p>
            </div>

            <div className="card green">
              <ChatIcon sx={{fontSize:120}}/>

              <b>Chat with renter</b>
              <p>
                Chat or Send a request to product owner in order to assign that product to you.
              </p>
            </div>

            <div className="card green">
              <TourIcon sx={{fontSize:120}}/>

              <b>Use it for your need</b>
              <p>
                Collect the product from the owner and use it for your need.
              </p>
            </div>

          </div>


      </div>

    </motion.div>
  )
}
