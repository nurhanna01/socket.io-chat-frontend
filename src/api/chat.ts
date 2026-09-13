import { activeMessageType } from "../context/ChatContext";
import apiClient from "./client";

export const getConversationsApi = async () => {
  const response = await apiClient.get("/messages");
  return response;
};

export const getDetailConversationApi = async (room_id: number) => {
  const response = await apiClient.get<{
    message: string;
    messages: activeMessageType[];
  }>(`/messages/${room_id}`);
  return response;
};
