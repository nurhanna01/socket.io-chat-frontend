import apiClient from "./client";

export const loginApi = async (username: string, password: string) => {
  const response = await apiClient.post("/auth/login", { username, password });
  return response;
};
