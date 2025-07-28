import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function OwnerChat() {
  const { userId } = useParams(); // receiver
  const user = JSON.parse(localStorage.getItem("user")); // sender from localStorage
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!user || !user._id || !userId) return;

      try {
        const res = await axios.post("http://localhost:5000/api/messages/getmsg", {
          from: user._id,
          to: userId,
        });
        setMessages(res.data);
      } catch (err) {
        console.error("❌ Error loading messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [user, userId]);

  const sendMessage = async () => {
    if (!message.trim() || !user || !user._id || !userId) return;

    try {
      await axios.post("http://localhost:5000/api/messages/addmsg", {
        from: user._id,
        to: userId,
        message,
      });

      setMessages((prev) => [...prev, { fromSelf: true, message }]);
      setMessage("");
    } catch (err) {
      console.error("❌ Error sending message:", err);
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
            <div key={idx} style={{ textAlign: msg.fromSelf ? "right" : "left" }}>
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
