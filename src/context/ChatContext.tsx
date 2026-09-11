import React, { createContext, useContext, useEffect, useState } from "react";
import { getConversationsApi, getDetailConversationApi } from "../api/chat";
import { UseAuth } from "./AuthContext";
import { UseSocket } from "./SocketContext";

interface ChatContextInterface {
  conversations: Array<object>;
  fetchConversation: () => void;
  activeMessage: Array<object> | null;
  activeRoom: { id: number; friend_username: string };
  storeActiveRoom: (id: number, friend_username: string) => void;
  fetchDetailConversation: (room_id: number) => void;
  sendMessage: (content: string) => void;
}

interface activeMessageType {
  content: string;
  sender_id: number;
  sender_username: string;
  is_read: number;
  timestamp: string;
}

const ChatContext = createContext<ChatContextInterface | null>(null);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [conversations, setConversations] = useState([]);
  const [activeMessage, setActiveMessage] = useState<activeMessageType[]>([]);
  const [activeRoom, setActiveRoom] = useState({ id: 0, friend_username: "" });

  const fetchConversation = async () => {
    const res = await getConversationsApi();
    setConversations(res.data.messages);
  };

  const storeActiveRoom = (id: number, friend_username: string) => {
    setActiveRoom({ id: id, friend_username: friend_username });
  };

  const fetchDetailConversation = async (room_id: number) => {
    const res = await getDetailConversationApi(room_id);
    setActiveMessage(res.data.messages);
  };

  const { profile } = UseAuth();
  const { socket } = UseSocket();

  const sendMessage = (content: string) => {
    socket?.emit("SEND_MESSAGE", {
      sender: profile?.username,
      receiver: activeRoom?.friend_username,
      room: activeRoom?.id,
      content,
    });
  };

  useEffect(() => {
    if (!socket) return;

    const handleSuccess = (data: any) => {
      if (activeRoom && activeRoom.id == data.room_id) {
        setActiveMessage((prev) => [...prev, data]);
      }
    };

    socket.on("SUCCESS_SAVE_MESSAGE", handleSuccess);

    return () => {
      socket.off("SUCCESS_SAVE_MESSAGE", handleSuccess);
    };
  }, [socket, activeRoom]);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        fetchConversation,
        activeMessage,
        activeRoom,
        storeActiveRoom,
        fetchDetailConversation,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext)!;
