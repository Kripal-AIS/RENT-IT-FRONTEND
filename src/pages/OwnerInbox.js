import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OwnerInbox() {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  // Get logged-in owner from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user, "Current user in inbox");

  useEffect(() => {
    const fetchInboxUsers = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/message/inbox-users", {
          ownerId: user._id,
        });
        console.log(res, "Inbox users fetched successfully");
        setUserList(res.data);
      } catch (error) {
        console.error("❌ Error fetching inbox users:", error);
      }
    };

    console.log(user, "Current user in inbox");

    if (user && user._id) {
      fetchInboxUsers();
    }
  }, []);

  const openChat = (userId) => {
    navigate(`/owner/chat/${userId}`);
  };

  if (!user || !user._id) {
    return <p>🔒 Please login to view the inbox</p>;
  }

  return (
    <div>
      <h2>Owner Inbox</h2>
      {userList.length === 0 ? (
        <p>Your inbox is empty</p>
      ) : (
        <ul>
          {userList.map((uId, index) => (
            <li key={index} onClick={() => openChat(uId)} style={{ cursor: "pointer" }}>
              Chat with User ID: {uId}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OwnerInbox;
