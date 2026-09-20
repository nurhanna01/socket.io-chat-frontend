import React, { createContext, useContext, useEffect, useState } from "react";
import { getConversationsApi, getDetailConversationApi } from "../api/chat";
import { UseAuth } from "./AuthContext";
import { UseSocket } from "./SocketContext";

interface ChatContextInterface {
  conversations: Array<Conversation>;
  fetchConversation: () => void;
  activeMessage: Array<activeMessageType> | null;
  activeRoom: { id: number | null; friend_username: string };
  storeActiveRoom: (id: number | null, friend_username: string) => void;
  fetchDetailConversation: (room_id: number) => void;
  sendMessage: (content: string) => void;
  onlineUsers: { id: number; username: string }[];
}

export interface activeMessageType {
  content: string;
  sender_id: number;
  is_read: number;
  timestamp: string;
  room_id?: number;
}

interface activeRoom {
  id: number | null;
  friend_username: string;
}

export interface Conversation {
  room_id: number;
  friend_username: string;
  last_message: {
    content: string;
    timestamp: string;
    is_read: number;
    sender_id: number;
    sender_username?: string;
  };
}

interface OnlineUser {
  users: User[];
}

interface User {
  id: number;
  username: string;
}

const ChatContext = createContext<ChatContextInterface | null>(null);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeMessage, setActiveMessage] = useState<activeMessageType[]>([]);
  const [activeRoom, setActiveRoom] = useState<activeRoom>({
    id: null,
    friend_username: "",
  });
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);

  const fetchConversation = async () => {
    const res = await getConversationsApi();
    setConversations(res.data.messages);
  };

  const storeActiveRoom = (id: number | null, friend_username: string) => {
    setActiveRoom({ id: id, friend_username: friend_username });
    if (id != null) {
      fetchDetailConversation(id);
    }
  };

  const fetchDetailConversation = async (room_id: number) => {
    try {
      const res = await getDetailConversationApi(room_id);
      setActiveMessage(res.data.messages);
    } catch (error) {
      console.error(`error fetchDetailConversation:`, error);
    }
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

    const handleSuccess = (data: activeMessageType) => {
      if (activeRoom && activeRoom.id == data.room_id) {
        setActiveMessage((prev) => [...prev, data]);
      }
      setConversations((prev) =>
        prev.map((c) =>
          c.room_id == data.room_id ? { ...c, last_message: data } : c,
        ),
      );
    };

    const handleReceive = (data: activeMessageType) => {
      try {
        if (activeRoom && activeRoom.id == data.room_id) {
          setActiveMessage((prev) => [...prev, data]);
        }
        setConversations((prev) =>
          prev.map((c) =>
            c.room_id == data.room_id ? { ...c, last_message: data } : c,
          ),
        );
      } catch (error) {
        console.error(error);
      }
    };

    socket.on("SUCCESS_SAVE_MESSAGE", handleSuccess);
    socket.on("RECEIVE_MESSAGE", handleReceive);

    return () => {
      socket.off("SUCCESS_SAVE_MESSAGE", handleSuccess);
      socket.off("RECEIVE_MESSAGE", handleReceive);
    };
  }, [socket, activeRoom]);

  useEffect(() => {
    const handleJoinConfirmed = (data: OnlineUser) => {
      try {
        // TODO
        setOnlineUsers(data.users);
      } catch (error) {
        console.error(`error processing handleJoinConfirmed: ${error} `);
      }
    };

    const handleUserUpdated = () => {
      try {
        // TODO
      } catch (error) {
        console.error(`error processing handleUserUpdated: ${error} `);
      }
    };
    socket?.on("JOIN_CONFIRMED", handleJoinConfirmed);
    socket?.on("USERS_UPDATED", handleUserUpdated);
  }, [socket]);

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
        onlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext)!;
