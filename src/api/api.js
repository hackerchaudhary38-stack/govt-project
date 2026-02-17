// src/api/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://complaint-portal-xfaa.onrender.com/api", // ✅ Render backend URL
  withCredentials: true, // keeps cookies/auth working
});

export default API;
