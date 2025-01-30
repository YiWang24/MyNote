import axios from "axios";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";

// Create an axios instance
const request = axios.create({
  baseURL: "http://localhost:8888/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const whiteList = ["/auth/login", "/auth/register"];
// Add a request interceptor
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // console.log("Token: ", token);
    // console.log("config url", config.url);
    if (!whiteList.includes(config.url) && token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (whiteList.includes(config.url)) {
      console.log("Request path is in white list");
    } else {
      redirect("/login");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
request.interceptors.response.use(
  (response) => {
    // console.log("Response: ", response);
    return response;
  },
  (error) => {
    // console.log("Error: ", error.response.data?.message);
    const message = error.response?.data?.message || "An error occurred";
    // if (error.response) {
    //   switch (error.response.status) {
    //     case 400:
    //       console.error("Bad Request: ", response.data);

    //       break;
    //     case 401:
    //       console.error("Unauthorized: ", response.data);

    //       break;
    //     case 403:
    //       console.error("Forbidden: ", response.data);

    //       break;
    //     case 404:
    //       console.error("Not Found: ", response.data);

    //       break;
    //     case 409:
    //       console.error("Conflict: ", response.data);

    //       break;
    //     case 500:
    //       console.error("Server Error: ", response.data);

    //       break;
    //     default:
    //       console.error("Unhandled status code: ", response.status);
    //   }
    // }
    toast.error(message);
    return Promise.reject(error);
  }
);

export default request;
