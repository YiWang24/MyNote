"use client";
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { authApi } from "@/api/auth";
import { toast } from "react-hot-toast";
export const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  register: (data) => {},
  login: (data) => {},
  logout: () => {},
});

// This function checks if the token is valid
const checkTokenValidity = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    console.log(decodedToken.exp, currentTime);
    return decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
};

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // This useEffect hook checks if the token is valid
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (storedToken && checkTokenValidity(storedToken)) {
      setToken(storedToken);
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
    }
  }, []);

  const register = async (data) => {
    try {
      const response = await authApi.register(data);
      // console.log(response.data.token + "token");
      setToken(response.data.token);
      setIsLoggedIn(true);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("isLoggedIn", true);
      toast.success("Registration successful");
      return response.status;
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (data) => {
    try {
      const response = await authApi.login(data);
      // console.log(response.data.token + "token");
      setToken(response.data.token);
      setIsLoggedIn(true);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("isLoggedIn", true);
      toast.success("Login successful");
      return response.status;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    setToken(null);
    setIsLoggedIn(false);
  };

  const authValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    register,
    login,
    logout,
  };
  return <AuthContext value={authValue}>{children}</AuthContext>;
}
