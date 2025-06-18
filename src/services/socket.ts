import { io } from "socket.io-client";

const socketURL = "ws://localhost:4000";
const username = localStorage.getItem("username");
export const socket = io(socketURL, {
  query: {
    username,
    isnull: username ? false : true,
  },
});
