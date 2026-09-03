import axios from "axios";

const token = localStorage.getItem("token")

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3009",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  validateStatus: (status) => status < 500,
});

export default apiClient