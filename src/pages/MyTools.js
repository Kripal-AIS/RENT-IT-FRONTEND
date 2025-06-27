import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { API } from "../API";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import emptyBox from "../imgs/emptyBox.png";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import changeDateFormat from "../helpers/changeDateFormat";
import { Navigate, useNavigate } from "react-router-dom";
export default function MyTools() {
  const [rented, setRented] = useState([]);
  const [borrowed, setBorrowed] = useState([]);
  const [isLoading, setIsLoading] = useState();

  // const {  error, data } = useQuery('repoData', () =>
  //    axios.get(API+"/user/mytools",{withCredentials:true}).then(res =>
  //      res
  //    )
  //  )

  const retriveProduct = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios.delete(API + `/product/revoke?productid=${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setIsLoading(false);
        window.location.reload();
      }
    } catch (e) {
      alert("Not retrived");
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are You Sure !!")) {
      setIsLoading(true);
      try {
        const res = await axios.delete(API + `/product/${id}`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          setIsLoading(false);
          navigate("/explore");
        }
      } catch (e) {
        alert("Not Deleted");
      }
    }
  };

  const navigate = useNavigate();

  const fetchMyTools = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(API + "/user/mytools", {
        withCredentials: true,
      });

      setRented(res.data.rented);
      setBorrowed(res.data.borrowed);
    } catch (e) {
      alert("Error occured");
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchMyTools();
    // if(data){

    //   setRented(data.data.rented)
    //   setBorrowed(data.data.borrowed)
    // }
  }, []);

  const [activeTab, setActiveTab] = useState("RENTED");
  return (
    <motion.div
      className="page mytools"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <h2>My Products</h2>

      <div className="bottom">
        <div className="btns">
          <div
            className="tabs"
            style={
              activeTab === "RENTED"
                ? { borderBottom: "5px solid #05396B", color: "#05396B" }
                : {}
            }
            onClick={() => setActiveTab("RENTED")}
          >
            Rented
          </div>
          <div
            className="tabs"
            style={
              activeTab === "BORROWED"
                ? { borderBottom: "5px solid #05396B", color: "#05396B" }
                : {}
            }
            onClick={() => setActiveTab("BORROWED")}
          >
            Borrowed
          </div>
        </div>

        <div className="listProduct">
          {isLoading ? (
            <Loader />
          ) : activeTab === "RENTED" ? (
            rented.length ? (
              <>
                {rented.map((prd, index) => (
                  <div key={index} className="cards ">
                    <div className="product">
                      <img
                        src={prd.image}
                        alt=""
                        onClick={() => navigate(`/product/${prd._id}`)}
                      />
                    </div>
                    <div
                      className="des"
                      onClick={() => navigate(`/product/${prd._id}`)}
                    >
                      <h3>{prd.title}</h3>
                    </div>
                    <p>
                      {prd.rent}
                      {prd.timeperiod}
                    </p>
                    <p>
                     {/* from : {changeDateFormat( prd.agreement.from)}<br></br>
                     to : {changeDateFormat( prd.agreement.to)} */}
                    </p>
                    

                    {prd.issued ? (
                      <>
                        <div className="contract">
                          <div className="borrowerInfo">
                            <img src={prd.borrower?.avatar} alt="" />
                            <b>{prd.borrower?.username}</b>
                          </div>

                          <p>From : {changeDateFormat(prd.agreement?.from)}</p>
                          <p>to : {changeDateFormat(prd.agreement?.to)}</p>
                        </div>
                        <button
                          className="red"
                          onClick={() => {
                            retriveProduct(prd._id);
                          }}
                        >
                          Retrive
                        </button>
                      </>
                    ) : (
                      <div className="actions">
                        <button
                          className="blue"
                          onClick={() =>
                            navigate("/editProduct", { state: prd })
                          }
                        >
                          <svg
                            fill="#05396B"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" />
                          </svg>
                        </button>
                        <button
                          className="red"
                          onClick={() => deleteProduct(prd._id)}
                        >
                          <svg
                            fill="#BB0303"
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          >
                            <path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2zm-7-10.414l3.293-3.293 1.414 1.414-3.293 3.293 3.293 3.293-1.414 1.414-3.293-3.293-3.293 3.293-1.414-1.414 3.293-3.293-3.293-3.293 1.414-1.414 3.293 3.293zm10-8.586h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-8-3h-4v1h4v-1z" />
                          </svg>
                        </button>
                      </div>
                    )}

                    {/* <ProductCard index={index} {...prd} /> */}
                  </div>
                ))}
              </>
            ) : (
              <div className="flex-col">
                <img height={80} width={80} src={emptyBox} alt="" />
                No Products
              </div>
            )
          ) : borrowed.length ? (
            <>
              {borrowed.map((prd, index) => (
                <>
                  {/* <ProductCard index={index} {...prd} /> */}
                  <div key={index} className="cards ">
                    <div className="product">
                      <img
                        src={prd.image}
                        alt=""
                        onClick={() => navigate(`/product/${prd._id}`)}
                      />
                    </div>
                    <div
                      className="des"
                      onClick={() => navigate(`/product/${prd._id}`)}
                    >
                      <h3>{prd.title}</h3>
                    </div>
                    <p>
                      {prd.rent}
                      {prd.timeperiod}
                    </p>
                    <p>
                     from : {changeDateFormat( prd.agreement.from)}<br></br>
                     to : {changeDateFormat( prd.agreement.to)}
                    </p>


                    <>
                      <div className="contract">
                        <div className="borrowerInfo">
                          {/* <img src={prd.borrower.avatar} alt="" />
                            <b>{prd.borrower.username}</b> */}
                        </div>

                        {/* <p>From : {changeDateFormat(prd.agreement)}</p>
                          <p>to : {changeDateFormat(prd.agreement.to)}</p> */}
                      </div>

                    </>


                    {/* <ProductCard index={index} {...prd} /> */}
                  </div>
                </>
              ))}
            </>
          ) : (
            <div className="flex-col">
              <img height={80} width={80} src={emptyBox} />
              No Products
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
