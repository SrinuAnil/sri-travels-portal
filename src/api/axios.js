import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "https://sri-travels-backend-database.onrender.com"

  // baseURL: "http://localhost:3001"
});

instance.interceptors.request.use((config) => {
  const token = Cookies.get("jwt_token");
  console.log(token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
