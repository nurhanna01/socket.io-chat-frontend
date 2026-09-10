import apiClient from "./client";

export const getConversationsApi = async () => {
  const response = await apiClient.get("/messages");
  return response;
};

export const getDetailConversationApi = async (room_id: number) => {
  const response = await apiClient.get(`/messages/${room_id}`);
  return response;
};
