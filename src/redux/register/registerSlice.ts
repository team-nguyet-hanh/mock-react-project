import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../models/user";
export interface RegisterPayload {
    username: string;
    email: string;
    password: string;
}

export interface RegisterState {
    isSuccess: boolean;
    isFail: boolean;
    newUser?: UserType;
    isSignUp: boolean
}

const initialState: RegisterState = {
    isSuccess: false,
    isFail: false,
    isSignUp: false,
    newUser: undefined
}

const registerSlice = createSlice({
    name: 'register',
    initialState: initialState,
    reducers: {
        signup(state, _action: PayloadAction<RegisterPayload>) {
            state.isSignUp = true;
        },
        registerSuccess(state, action: PayloadAction<UserType>) {
            state.isSuccess = true;
            state.newUser = action.payload;
        },
        registerFail(state, _action: PayloadAction<string>) {
            state.isFail = true;
        },
        registered(state) {
            state.isSuccess = false;
        }
    }
})

export const registerActions = registerSlice.actions;
//reducer
export default registerSlice.reducer