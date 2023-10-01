import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../models/user";

export interface FollowState {
  isLoading: boolean;
  isSuccess: boolean;
  isFail: boolean;
  profileUpdate: UserType;
}

const initialFollowState = {
  isLoading: false,
  isSuccess: false,
  isFail: false,
  profileUpdate: {},
};

const FollowSlice = createSlice({
  name: "follow",
  initialState: initialFollowState,
  reducers: {
    following(state, _action: PayloadAction<string>) {
      state.isLoading = true;
    },
    unfollowing(state, _action: PayloadAction<string>) {
      state.isLoading = true;
    },
    followSuccess(state, action: PayloadAction<UserType>) {
      state.isSuccess = true;
      state.isLoading = false;
      state.profileUpdate = action.payload;
    },
    followFail(state, _action: PayloadAction<string>) {
      state.isLoading = false;
      state.isFail = true;
    },
    unfollowSuccess(state, action: PayloadAction<UserType>) {
      state.isSuccess = true;
      state.isLoading = false;
      state.profileUpdate = action.payload;
    },
    unfollowFail(state, _action: PayloadAction<string>) {
      state.isLoading = false;
      state.isFail = true;
    },
  },
});

export const {
  following,
  unfollowing,
  followSuccess,
  followFail,
  unfollowSuccess,
  unfollowFail,
} = FollowSlice.actions;
export default FollowSlice;
