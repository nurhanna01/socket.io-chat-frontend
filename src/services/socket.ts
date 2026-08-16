import { io } from "socket.io-client";

const socketURL = import.meta.env.VITE_SOCKET_URL || "ws://localhost:3009";

export const createSocket = (token: string) => {
  return io(socketURL, {
    auth: {
      token: `Bearer ${token}`
    },
  });
};

// delete this later
export const socket = io(socketURL, {
  query: {
  },
});
