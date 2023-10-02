import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../models/user";

export interface CurrentUserState {
  isLoading: boolean;
  isSuccess: boolean;
  isFail: boolean;
  currentAccount: UserType | unknown;
}

const initialProfileState: CurrentUserState = {
  isLoading: false,
  isSuccess: false,
  isFail: false,
  currentAccount: {},
};

const CurrentUserSlice = createSlice({
  name: "currentUser",
  initialState: initialProfileState,
  reducers: {
    getCurrentUser(state) {
      state.isLoading = true;
    },
    getCurrentUserSuccess(state, action: PayloadAction<UserType>) {
      state.isSuccess = true;
      state.isLoading = false;
      state.currentAccount = action.payload;
    },
    getCurrentUserFail(state, _action: PayloadAction<string>) {
      state.isLoading = false;
      state.isFail = true;
      state.isSuccess = false;
    },
  },
});

export const { getCurrentUser, getCurrentUserSuccess, getCurrentUserFail } =
  CurrentUserSlice.actions;
export default CurrentUserSlice;
