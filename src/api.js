import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/", // your DRF backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token from localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default API;
