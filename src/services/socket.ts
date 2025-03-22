import { io } from "socket.io-client";

const socketURL = "ws://localhost:4000";

export const socket = io(socketURL);
