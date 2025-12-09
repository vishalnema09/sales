// src/services/api.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "https://sales-ilg2.onrender.com";

const api = axios.create({
  baseURL: API_BASE + "/api",
  timeout: 15000,
});

export default api;
