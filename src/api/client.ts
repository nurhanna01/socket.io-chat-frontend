import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3009",
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: (status) => status < 500,
});

export default apiClient