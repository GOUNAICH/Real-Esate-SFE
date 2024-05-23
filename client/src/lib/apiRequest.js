import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://real-esate-sfe-back.vercel.app/api",
  withCredentials: true,
});

export default apiRequest;