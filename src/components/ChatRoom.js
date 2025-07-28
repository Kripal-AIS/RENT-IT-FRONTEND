import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // or "http://localhost:5000"

function ChatRoom({ roomId, currentUser }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("joinRoom", { roomId });

    socket.on("receiveMessage", ({ message, senderId }) => {
      setMessages(prev => [...prev, { message, senderId }]);
    });

    return () => socket.disconnect();
  }, [roomId]);

  const handleSend = () => {
    if (message.trim()) {
      socket.emit("sendMessage", {
        roomId,
        message,
        senderId: currentUser._id
      });
      setMessages(prev => [...prev, { message, senderId: currentUser._id }]);
      setMessage("");
    }
  };

  return (
    <div>
      <h3>Chat</h3>
      <div style={{ height: "300px", overflowY: "scroll", border: "1px solid gray", marginBottom: "10px" }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.senderId === currentUser._id ? "right" : "left" }}>
            <span>{msg.message}</span>
          </div>
        ))}
      </div>
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default ChatRoom;
