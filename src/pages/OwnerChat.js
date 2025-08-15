import React, { useEffect, useState, useRef } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import socket from "../sockets"; 

function OwnerChat() {
  const { userId } = useParams(); // the user you're chatting with
  const user = JSON.parse(localStorage.getItem("user")); // owner logged in
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const roomId = [user?._id, userId].sort().join("_");

  useEffect(() => {
    
    if (!user || !user._id || !userId) return;
if (!roomId || roomId.includes("undefined")) {
      console.error("Invalid roomId:", roomId);
      return;
    }
    // 1. Join room
    socket.emit("joinRoom", roomId );

    // 2. Listen for incoming messages
    socket.on("receiveMessage", ({ message, senderId }) => {
      setMessages((prev) => [...prev, { message, senderId }]);
    });

    // 3. Fetch existing messages
    const fetchMessages = async () => {
      try {
        const res = await axios.post(`${API}/api/message/getmsg`, {
          from: user._id,
          to: userId,
        });

        setMessages(
          res.data.map((msg) => ({
            message: msg.message,
            senderId: msg.sender,
          }))
        );
      } catch (err) {
        console.error("❌ Error loading messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    return () => {
      socket.off("receiveMessage");
      socket.disconnect();
    };
  }, [user, userId]);
    // Scroll-to-bottom effect:
const chatBoxRef = useRef(null);
useEffect(() => {
  chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
}, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    // 1. Send via socket
    socket.emit("sendMessage", {
      roomId,
      message,
      senderId: user._id,
    });

    setMessage("");

    // 2. Save in DB
    try {
      await axios.post(`${API}/api/message/addmsg`, {
        from: user._id,
        to: userId,
        message,
      });
    } catch (err) {
      console.error("❌ Error saving message:", err);
    }
  };

  if (!user || !user._id) {
    return <p>🔒 Please login to use the chat</p>;
  }

  return (
    <div>
      <h2>Chat with User ID: {userId}</h2>

      <div style={{ maxHeight: "300px", overflowY: "scroll", border: "1px solid gray", marginBottom: "10px", padding: "10px" }}>
        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} style={{ textAlign: msg.senderId === user._id ? "right" : "left" }}>
              {msg.message}
            </div>
          ))
        )}
      </div>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        style={{ width: "80%" }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default OwnerChat;
