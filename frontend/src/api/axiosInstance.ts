// import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL; // <-- Fix the base URL

// const axiosInstance = axios.create({
//     baseURL: API_BASE_URL,
//     headers: {
//         "Content-Type": "application/json",
//     },
//     withCredentials: true, 
// })

export default API_BASE_URL;