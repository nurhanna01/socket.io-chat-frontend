import React, { createContext, useContext, useState } from "react";
import { getConversationsApi } from "../api/chat";

const ChatContext = createContext<any>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [conversations, setConversations] = useState([]);

  const fetchConversation = async () => {
    const res = await getConversationsApi();
    setConversations(res.data.messages);
  };

  return (
    <ChatContext.Provider value={{ conversations, fetchConversation }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
