import axios from "axios";
import WEB_BASE_URL from "../config/web";

// Create an Axios instance with base URL from environment variable
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Add response interceptor to handle 401 and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("Errors: ", error);
    // Check if error response is 401 and this is the first retry
    if (
      (error.response &&
        error.response.status === 401 &&
        !originalRequest._retry &&
        error.response.data.message === "Invalid token. Please login again") ||
      error.response.data.message ===
        "You do not have permission to perform this action"
    ) {
      console.log("Error: ", error.response);
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Request a new access token
        const response = await api.post("/api/token/refresh/", {
          refresh: refreshToken,
        });

        const newAccessToken = response.data?.data?.access;

        if (newAccessToken) {
          // Store and use new token
          localStorage.setItem("access", newAccessToken);
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return api(originalRequest); // Retry original request
        } else {
          throw new Error("Token refresh failed");
        }
      } catch (refreshError) {
        // Redirect if refresh fails
        alert("ផុតកំណត់ការប្រើប្រាស់!");
        window.location.href = `${WEB_BASE_URL}/log-in`;
        return Promise.reject(refreshError);
      }
    }
    // Reject all other errors
    return Promise.reject(error);
  }
);

export default api;
