import axios from "axios";
import { getSession } from "./getSession";
import { redirect } from "next/navigation";

// Create an axios instance
const request = axios.create({
  baseURL: "http://localhost:8888/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

const whiteList = ["/auth/login", "/auth/register"];
// Add a request interceptor
request.interceptors.request.use(
  async (config) => {
    console.log(config.baseURL+config.url);

    const session = await getSession();
    const token = session.accessToken;

    // console.log("token: ", token);

    if (!whiteList.includes(config.url) && token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (whiteList.includes(config.url)) {
      console.log("Request path is in white list");
    } else {
      redirect("/");
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
    return Promise.reject(error);
  }
);

export default request;
