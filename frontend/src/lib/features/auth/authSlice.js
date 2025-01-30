import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "@/api/auth";
import { jwtDecode } from "jwt-decode";

// This slice contains the auth state and reducers
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    token: "",
  },
  reducers: {
    initializeAuth: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.user = action.payload.user;
      localStorage.setItem(
        "auth",
        JSON.stringify({
          token: action.payload.token,
          isLoggedIn: true,
          user: action.payload.user,
        })
      );
    },
    loginFailure: (state) => {
      state.token = "";
      state.isLoggedIn = false;
      state.user = {};
      localStorage.removeItem("auth");
    },
    logout: (state) => {
      state.token = "";
      state.isLoggedIn = false;
      state.user = {};
      localStorage.removeItem("auth");
    },
  },
});

const { initializeAuth, loginSuccess, loginFailure, logout } =
  authSlice.actions;

const authReducer = authSlice.reducer;

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

// This function loads the auth state from local storage
const loadAuthState = () => {
  try {
    const serializedAuth = localStorage.getItem("auth");
    if (serializedAuth === null) {
      return {
        isLoggedIn: false,
        user: null,
        token: "",
      };
    } else {
      const auth = JSON.parse(serializedAuth);
      if (checkTokenValidity(auth.token)) {
        return {
          isLoggedIn: true,
          user: auth.user,
          token: auth.token,
        };
      } else {
        return {
          isLoggedIn: false,
          user: null,
          token: "",
        };
      }
    }
  } catch (error) {
    return {
      isLoggedIn: false,
      user: null,
      token: "",
    };
  }
};

const InitializeAuth = () => (dispatch) => {
  const auth = loadAuthState();
  dispatch(initializeAuth(auth));
};

const fetchLogin = (data) => async (dispatch) => {
  try {
    console.log(data);
    const response = await authApi.login(data);
    dispatch(loginSuccess(response.data));
    return response.status;
  } catch (error) {
    dispatch(loginFailure());
    console.log(error);
  }
};

const fetchRegister = (data) => async (dispatch) => {
  try {
    const response = await authApi.register(data);
    dispatch(loginSuccess(response.data));
    return response.status;
  } catch (error) {
    dispatch(loginFailure());
    console.log(error);
  }
};

const fetchLogout = () => async (dispatch) => {
  dispatch(logout());
};

export { fetchLogin, fetchRegister, fetchLogout, InitializeAuth };
export default authReducer;
