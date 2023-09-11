// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

// ** UseJWT import to get config
import useJwt from "@src/auth/jwt/useJwt";

const config = useJwt.jwtConfig;

const initialUser = () => {
  const item = window.localStorage.getItem("userData");
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {};
};

export const authSlice = createSlice({
  name: "authentication",
  initialState: {
    userData: initialUser(),
  },
  reducers: {
    handleLogin: (state, action) => {
      console.log("action", action.payload.data.jwtToken)
      state.userData = action.payload;
      state[config.storageTokenKeyName] =
        action.payload.data[config.storageTokenKeyName];
      state[config.storageRefreshTokenKeyName] =
        action.payload.data[config.storageRefreshTokenKeyName];
      localStorage.setItem(
        config.storageTokenKeyName,
        action.payload.data.jwtToken
      );
      localStorage.setItem(
        config.storageRefreshTokenKeyName,
        action.payload.data.refreshToken
      );
      localStorage.setItem("userData", JSON.stringify(action.payload.data.accountInfo))
    },
    handleLogout: (state) => {
      state[config.storageTokenKeyName] = null;
      state[config.storageRefreshTokenKeyName] = null;
      // ** Remove user, accessToken & refreshToken from localStorage
      localStorage.removeItem(config.storageTokenKeyName);
      localStorage.removeItem("userData");
      localStorage.removeItem(config.storageRefreshTokenKeyName);
    },
  },
});

export const { handleLogin, handleLogout } = authSlice.actions;

export default authSlice.reducer;
