import React, { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { createSocket } from "../services/socket";

interface AuthContextType {
  socket: Socket | null;
  connect: (token: string) => void;
  disconnect: () => void;
}

export const SocketContext = createContext<AuthContextType | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [, setIsConnected] = useState(false);

  const connect = (token: string) => {
    const newSocket = createSocket(token);
    setSocket(newSocket);
  };

  const disconnect = () => {
    setSocket(null);
  };

  useEffect(() => {
    if (!socket) return;
    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }
    socket.on("connect", () => {
      onConnect();
      console.log("socket connected =>", socket.connected);
    });
    socket.on("disconnect", onDisconnect);

    // Clean up socket events on unmount
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, connect, disconnect }}>
      {children}
    </SocketContext.Provider>
  );
};
export const UseSocket = () => useContext(SocketContext)!;
