import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.status && err.status === 401) {
      // Token expired or invalid
      alert("ផុតកំណត់ការប្រើប្រាស់!");
      window.location.href = "http://localhost:8012/log-in";
    }
    return Promise.reject(err);
  }
);
export default api;
