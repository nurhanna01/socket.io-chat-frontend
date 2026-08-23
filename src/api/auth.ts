import apiClient from "./client";

export const loginApi = async (username: string, password: string) => {
  const response = await apiClient.post("/auth/login", { username, password });
  return response;
};

export const registerApi = async (username: string, password: string) => {
  const response = await apiClient.post("/auth/register", {
    username,
    password,
  });
  return response;
};
