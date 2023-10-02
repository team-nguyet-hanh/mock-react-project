import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../models/user";

export interface LoginPayLoad {
  email: string;
  password: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  invalid: boolean;
  logging?: boolean;
  currentUser?: UserType;
  isLoading?: boolean;
  isSuccess?: boolean;
}

const initialState: AuthState = {
  isLoggedIn: Boolean(localStorage.getItem("access_token")),
  logging: false,
  invalid: false,
  currentUser: undefined,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, _action: PayloadAction<LoginPayLoad>) {
      state.logging = true;
    },
    loginSuccess(state, action: PayloadAction<UserType>) {
      state.isLoggedIn = true;
      state.logging = false;
      state.currentUser = action.payload;
      state.invalid = false;
    },
    loginFail(state, _action: PayloadAction<string>) {
      state.logging = false;
      state.invalid = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
});

// actions
export const authActions = authSlice.actions;
// reducer
export default authSlice.reducer;
