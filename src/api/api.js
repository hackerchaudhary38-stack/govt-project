// src/api/api.js
import axios from "axios";

// Axios instance for LIVE backend on Render
const API = axios.create({

  baseURL: "https://complaint-portal-xfaa.onrender.com/api",

  withCredentials: true,

});

// Request interceptor (debug)
API.interceptors.request.use(
  (config) => {

    console.log("Request URL:", config.baseURL + config.url);

    console.log("Request Data:", config.data);

    return config;

  },
  (error) => {

    console.error("Request Error:", error);

    return Promise.reject(error);

  }
);


// Response interceptor (debug)
API.interceptors.response.use(
  (response) => {

    console.log("Response:", response);

    return response;

  },
  (error) => {

    console.error(

      "API Error:",

      error.response?.data || error.message

    );

    return Promise.reject(error);

  }
);


export default API;
