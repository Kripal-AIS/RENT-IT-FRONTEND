import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { API } from "../API";
import changeDateFormat from "../helpers/changeDateFormat";
import emptyBox from "../imgs/emptyBox.png";

export default function ProductRequest() {
  const [activeTab, setActiveTab] = useState("RECEIVED");

  const [sented, setSented] = useState([]);
  const [received, setReceived] = useState([]);

  const fetchRequests = async () => {
    const res = await axios.get(API + "/request/myrequests", {
      withCredentials: true,
    });

    console.log(res.data);

    setSented(res.data.sented);
    setReceived(res.data.received);
  };

  const deleteRequest = async (id) => {

    if (window.confirm("Are you sure ?!!")) {

      try {
        const res = await axios.delete(API + `/request/delete?reqId=${id}`, { withCredentials: true })

        if (res.status < 400) {
          alert("Request successfully deleted")
        }


      }
      catch (e) {
        alert("Error occured")
      }
      window.location.reload()
    }


  }

  const acceptRequest = async (productid, borrowerid, revokedate, reqId) => {

    // if(window.confirm("Are you sure ?!!")){

    try {
      const reqBody = {
        productid,
        borrowerid,
        revokedate,
        reqId
      }
      const res = await axios.post(API + `/product/assign`, reqBody, { withCredentials: true })

      if (res.status < 400) {
        alert("Request successfully accepted")
      }


    }
    catch (e) {
      alert("Error occured")
    }
    // }
    window.location.reload()

  }

  const rejectRequest = async (id) => {

    if (window.confirm("Are you sure ?!!")) {

      try {
        const res = await axios.get(API + `/request/decline?reqId=${id}`, { withCredentials: true })

        if (res.status < 400) {
          alert("Request successfully rejected")
        }


      }
      catch (e) {
        alert("Error occured")
        
      }
    }
    window.location.reload()

  }
  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="page requestPage">
      <h2>My Requests</h2>

      <div className="bottom">
        <div className="btns">
          <div
            className="tabs"
            style={
              activeTab === "SENT"
                ? { borderBottom: "5px solid #05396B", color: "#05396B" }
                : {}
            }
            onClick={() => setActiveTab("SENT")}
          >
            Sent
          </div>
          <div
            className="tabs"
            style={
              activeTab === "RECEIVED"
                ? { borderBottom: "5px solid #05396B", color: "#05396B" }
                : {}
            }
            onClick={() => setActiveTab("RECEIVED")}
          >
            Received
          </div>
        </div>
        <div className="listProduct">
          {activeTab === "SENT" ? (
            sented.length ? (
              <>
                <table border={1}>
                  <tr className="titleFortable">
                    <th>Image</th>
                    <th>Name</th>
                    <th>owner</th>
                    <th>Startdate</th>
                    <th>Till</th>
                    <th>Address</th>
                    <th>Remove</th>
                  </tr>

                  {sented.map((req, index) => (
                    <tr key={req._id} className="">
                      <td>
                        <img
                          src={req.product.img}
                          className="productimg"
                          alt=""
                        />
                      </td>
                      <td>
                        <b>{req.product.name}</b>
                      </td>
                      <td>
                        <div className="ownerInfo">
                          <img src={req.owner.avatar} alt="" />
                          <p>{req.owner.username}</p>
                        </div>
                      </td>
                      <td>
                        <div className="">
                          <p>{changeDateFormat(req.startdate)}</p>
                        </div>
                      </td>
                      <td>
                        <div className="">
                          <p>{changeDateFormat(req.tilldate)}</p>
                        </div>
                      </td>
                      <td>
                        <div className="">
                          <p>{req.address}</p>
                        </div>
                      </td>
                      <td>
                        <button className="red" onClick={() => deleteRequest(req._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </table>
              </>
            ) : (
              <div className="flex-col">
                <img height={80} width={80} src={emptyBox} alt="" />
                No Requests
              </div>
            )
          ) : received.length ? (
            <>
              <table border={1}>
                <tr className="titleFortable">
                  <th>Image</th>
                  <th>Name</th>
                  <th>User</th>
                  <th>Start</th>
                  <th>Till</th>
                  <th>Address</th>
                  <th>Accept</th>
                  <th>Decline</th>

                </tr>

                {received.map((req, index) => (
                  <tr key={req._id} className="">
                    <td>
                      <img
                        src={req.product.img}
                        className="productimg"
                        alt=""
                      />
                    </td>
                    <td>
                      <b>{req.product.name}</b>
                    </td>
                    <td>
                      <div className="ownerInfo">
                        <img src={req.avatar} alt="" />
                        <p>{req.username}</p>
                      </div>
                    </td>

                    <td>
                      <div className="">
                        <p>{changeDateFormat(req.startdate)}</p>
                      </div>
                    </td>
                    <td>
                      <div className="">
                        <p>{changeDateFormat(req.tilldate)}</p>
                      </div>
                    </td>
                    <td>
                      <div className="">
                        <p>{req.address}</p>
                      </div>
                    </td>
                    <td>
                      <button className="yellow" onClick={() => acceptRequest(req.product._id, req.userid, req.tilldate, req._id)}>Accept</button>
                    </td>
                    <td>
                      <button className="red" onClick={() => rejectRequest(req._id)}>Decline</button>
                    </td>
                  </tr>
                ))}
              </table>
            </>
          ) : (
            <div className="flex-col">
              <img height={80} width={80} src={emptyBox} alt="" />
              No Requests
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
