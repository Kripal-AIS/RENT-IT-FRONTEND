import React, { useEffect, useRef, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { API } from '../API';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default function ChatHistory({ socket, currentChat, user, goBack }) {

    const scrollRef = useRef();
    const [chatMessages, setChatMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [inputMsg, setInputMsg] = useState("");

    useEffect(() => {
        const getAllMsgs = async () => {
            if (currentChat) {
                const response = await axios.post(`${API}/message/getallmsg`, {
                    from: user._id,
                    to: currentChat._id
                });
                const olderChats = response.data;
                olderChats.reverse();
                setChatMessages(olderChats);
            }
        }
        getAllMsgs();
    }, [currentChat]);

    const handleSendMsg = async (e) => {
        e.preventDefault();
        if (inputMsg.length > 0) {
            try {
                const data = await axios.post(`${API}/message/addmsg`, {
                    from: user._id,
                    to: currentChat?._id,
                    message: inputMsg
                })
                socket.current.emit("send-msg", {
                    to: currentChat?._id,
                    from: user._id,
                    message: inputMsg, ArrowBackIosIcon
                })

                const msgs = [...chatMessages];
                msgs.unshift({ fromSelf: true, message: inputMsg });
                setChatMessages(msgs);
                setInputMsg("");
            } catch (err) {
                console.log(err);
            }
        }
    }


    useEffect(() => {
        // if (socket.current) {
        socket.current.on("msg-receive", (msg) => {
            setArrivalMessage({
                fromSelf: false,
                message: msg
            })
        })
        // }
    }, []);

    useEffect(() => {
        arrivalMessage && setChatMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
    }, [chatMessages]);

    if (user)
        return (
            <div className='chatHistory'>
                <header>
                    <ArrowBackIosIcon style={{ cursor: "pointer" }} onClick={goBack} />
                    <img src={currentChat.avatar} alt="" />
                    <h3>{currentChat.username}</h3>
                </header>


                <div className="chats">
                    {
                        chatMessages.map((chatMsg, index) => {
                            return (
                                <div ref={scrollRef} key={uuidv4()}>
                                    {
                                        <div className={`msgs ${chatMsg.fromSelf ? "rightAlign" : "leftAlign"}`}>
                                            <p>
                                                {chatMsg.message}
                                            </p>
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <form onSubmit={(e) => handleSendMsg(e)} className="input">
                    <input autoFocus value={inputMsg} onChange={(e) => setInputMsg(e.target.value)} type="text" placeholder="Enter message here..." />
                    <button className="yellow">
                        <SendIcon />
                    </button>
                </form>
            </div >
        )
}
