import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { API, host } from '../API'
import ChatHistory from './ChatHistory'
import { io } from 'socket.io-client';

export default function ChatPopup() {
    const user = useSelector((state) => state.auth)
    const [contacts, setContacts] = useState();
    const [currentChat, setCurrentChat] = useState(undefined);
    const socket = useRef();


    // console.log(contacts)
    const [usersChat, setUsersChat] = useState(false) // set the user that is clicked

    // const userDetails = {
    //     avatar: "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-541.jpg",
    //     username: "yash",
    //     chats: [ // Earliest message first
    //         {
    //             sender: "yash",
    //             message: "Your welcome"
    //         },
    //         {
    //             fromSelf: true,
    //             message: "Thank you so much"
    //         },
    //         {
    //             sender: "yash",
    //             message: "sure"
    //         },
    //         {
    //             fromSelf: true,
    //             message: "I want your drill for 2 months"
    //         },
    //         {
    //             sender: "yash",
    //             message: "I am Fine"
    //         },
    //         {
    //             fromSelf: true,
    //             message: "How are you ? "
    //         },
    //         {
    //             sender: "yash",
    //             message: "Hii"
    //         },
    //         {
    //             fromSelf: true,
    //             message: "Hey"
    //         },
    //     ]
    // }

    useEffect(() => {
        const fetchUsers = async () => {
            // console.log(user);
            try {
                if (user) {
                    const res = await axios.get(`${API}/user/findall`);
                    const newContacts = res.data.filter((tempUser) => tempUser._id !== user._id)
                    setContacts(newContacts);
                }
            } catch (e) {
                // toast.error("Internal Server Error", toastOptions)
                console.log(e);
            }
        }
        fetchUsers();
    }, [])


    useEffect(() => {
        if (user) {
            socket.current = io(host);
            socket.current.emit("add-user", user._id);
            console.log("HEllo io host")
        }
    }, [user]);

    const changeCurChat = (index, contact) => {
        setUsersChat(true);
        setCurrentChat(contact);
    }



    return (
        <div className='chatpopup green'>
            {
                usersChat
                    ?
                    <>
                        <ChatHistory socket={socket} currentChat={currentChat} user={user} goBack={() => setUsersChat(false)} />
                    </>
                    :
                    <div className='chatUserList'>
                        <h2>Chats</h2>
                        {
                            contacts?.map((contact, index) =>
                                <div
                                    key={index}
                                    style={{ cursor: "pointer" }}
                                    className='userCard'
                                    onClick={() => changeCurChat(index, contact)}
                                >
                                    <img src={contact.avatar} alt="" />
                                    {contact.username}
                                </div>)
                        }
                    </div>
            }

        </div>
    )
}
