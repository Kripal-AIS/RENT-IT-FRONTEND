import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import socket from "../sockets" // adjust path if needed




function ChatWithOwner() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  
  const currentUserId = currentUser?._id;
  const location = useLocation();
  const { ownerId } = location.state || {};

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (!currentUserId || !ownerId)  return;
    

    const roomId = [currentUserId, ownerId].sort().join("_");
    if (!roomId || roomId.includes("undefined")) {
      console.error("Invalid roomId:", roomId);
      return;
    }

    socket.emit("joinRoom", roomId);
    console.log("Joined room:", roomId);

    const fetchMessages = async () => {
      try {
        const res = await axios.post(`${API}/api/message/getmsg`, {
          from: currentUserId,
          to: ownerId,
        });
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchMessages();

    socket.on("receiveMessage", ({ message, senderId }) => {
  const fromSelf = senderId === currentUserId;
  setMessages((prev) => [...prev, { fromSelf, message }]);
});


    return () => {
      socket.off("receiveMessage");
    };
  }, [currentUserId, ownerId]);

  const handleSend = async () => {
    if (!message.trim()) return;

    if (!currentUserId || !ownerId) {
      console.error("Cannot send message without user or owner ID");
      return;
    }

    const roomId = [currentUserId, ownerId].sort().join("_");

    socket.emit("sendMessage", {
      roomId,
      senderId: currentUserId,
      message,
    });

   //  setMessages((prev) => [...prev, { fromSelf: true, message }]);
    setMessage("");

    try {
      await axios.post(`${API}/api/message/addmsg`, {
        from: currentUserId,
        to: ownerId,
        message,
      });
    } catch (err) {
      console.error("Failed to save message:", err);
    }
  };

  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [messages]);

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>Chat with Owner</h2>
      <div
        ref={chatBoxRef}
        style={{
          maxHeight: "300px",
          overflowY: "scroll",
          border: "1px solid gray",
          marginBottom: "10px",
          padding: "10px",
        }}
      >
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                textAlign: msg.fromSelf ? "right" : "left",
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "10px",
                  borderRadius: "10px",
                  background: msg.fromSelf ? "#cfe9ff" : "#e6e6e6",
                }}
              >
                {msg.message}
              </span>
            </div>
          ))
        )}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: "10px" }}
        />
        <button onClick={handleSend} style={{ padding: "10px 15px" }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWithOwner;
