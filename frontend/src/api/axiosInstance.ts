import axios from "axios";

const API_BASE_URL = "http://localhost:5173"; // <-- Fix the base URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
