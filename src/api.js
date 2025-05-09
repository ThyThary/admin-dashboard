import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.status && err.status === 401) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh");

        console.log("New token:", refreshToken);
        const response = await api.post("/api/token/refresh/", {
          refresh: refreshToken,
        });
        const newToken = response.data.data.access;
        console.log(newToken);
        localStorage.setItem("access", newToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        // Token expired or invalid
        alert("ផុតកំណត់ការប្រើប្រាស់!");
        window.location.href = "http://localhost:8012/log-in";
        return Promise.reject(err);
      }
    }
  }
);
export default api;
