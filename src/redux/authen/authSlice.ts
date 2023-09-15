import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {User} from "../../models/user";

export interface LoginPayLoad {
    email: string;
    password: string
}


export interface AuthState {
    isLoggedIn: boolean;
    invalid: boolean;
    logging?: boolean;
    currentUser?: User;
}

const initialState: AuthState = {
    isLoggedIn: Boolean(localStorage.getItem("access_token")),
    logging: false,
    invalid: false,
    currentUser: undefined,
}
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    login(state, action: PayloadAction<LoginPayLoad>) {
        state.logging = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
        state.isLoggedIn = true;
        state.logging = false;
        state.currentUser = action.payload;

    },
    loginFail(state) {
        state.logging = false;
        state.invalid = true;
    },
    logout(state) {
        state.isLoggedIn = false;
        state.currentUser = undefined;
    }
  },

});

// actions
export const authActions = authSlice.actions;
// selectors
// export const selectorIsLoggedIn = (state: any) => state.auth.isLoggedIn;
// export const selectorIsLogging = (state: any) => state.auth.logging;
// reducer
export default authSlice.reducer;