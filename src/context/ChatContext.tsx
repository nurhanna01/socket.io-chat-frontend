import React, { createContext, useContext, useState } from "react";
import { getConversationsApi, getDetailConversationApi } from "../api/chat";

const ChatContext = createContext<any>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [conversations, setConversations] = useState([]);
  const [activeMessage, setActiveMessage] = useState(null);
  const [activeRoom, setActiveRoom] = useState({ id: 0, friend_name: "" });

  const fetchConversation = async () => {
    const res = await getConversationsApi();
    setConversations(res.data.messages);
  };

  const storeActiveRoom = async (id: number, friend_name: string) => {
    setActiveRoom({ id: id, friend_name: friend_name });
  };


  const fetchDetailConversation = async (room_id: number) => {
    const res = await getDetailConversationApi(room_id);
    setActiveMessage(res.data.messages);
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        fetchConversation,
        activeMessage,
        activeRoom,
        storeActiveRoom,
        fetchDetailConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
