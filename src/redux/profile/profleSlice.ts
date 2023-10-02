import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../models/user";

interface ProfileState {
  isLoading: boolean;
  isSuccess: boolean;
  isFail: boolean;
  currentUser: UserType | unknown;
}

const initialProfileState: ProfileState = {
  isLoading: false,
  isSuccess: false,
  isFail: false,
  currentUser: {},
};

const ProfileSlice = createSlice({
  name: "profile",
  initialState: initialProfileState,
  reducers: {
    getProfile(state, _action: PayloadAction<string | undefined>) {
      state.isLoading = true;
    },
    getProfileSuccess(state, action: PayloadAction<UserType>) {
      state.isSuccess = true;
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    getProfileFail(state, _action: PayloadAction<string>) {
      state.isLoading = false;
      state.isFail = true;
      state.isSuccess = false;
    },
  },
});

export const { getProfile, getProfileSuccess, getProfileFail } =
  ProfileSlice.actions;
export default ProfileSlice;
