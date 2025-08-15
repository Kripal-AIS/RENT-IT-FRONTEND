// socket.js
import { io } from "socket.io-client";
import API from "./api"; // Adjust the import path as necessary

const socket = io(API, {
  withCredentials: true,
});

export default socket;
