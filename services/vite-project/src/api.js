// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api/user",
  withCredentials: true, // allow cookies for refresh token
});

// Interceptor to refresh access token automatically
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired (401 Unauthorized) and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh endpoint
        const { data } = await api.post("/refresh");
        localStorage.setItem("accessToken", data.accessToken);

        // Update header and retry original request
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;

        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token failed", err);
        window.location.href = "/login"; // redirect to login
      }
    }
    return Promise.reject(error);
  }
);

export default api;
