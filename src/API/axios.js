import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "https://amazone-api-clone.onrender.com",
});

export {axiosInstance}