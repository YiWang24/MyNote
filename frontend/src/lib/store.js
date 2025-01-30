import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/lib/features/auth/authSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  });
};
