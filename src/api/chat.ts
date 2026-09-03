import apiClient from "./client";

export const getConversationsApi = async () => {
  const response = await apiClient.get("/messages");
  return response;
};
