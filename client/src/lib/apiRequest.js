import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://real-esate-sfe-backend.vercel.app",
  withCredentials: true,
});

export default apiRequest;