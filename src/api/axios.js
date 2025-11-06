import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:4765/api/", // your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors for auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // get JWT token if logged in
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
