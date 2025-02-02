import { io } from "socket.io-client";

const socketURL = "ws://localhost:3001";

export const socket = io(socketURL);
