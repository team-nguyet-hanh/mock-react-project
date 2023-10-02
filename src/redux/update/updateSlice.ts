import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface UserDataPayload {
  email: string;
  username: string;
  bio: string;
  image: string;
  password: string;
}

export interface UpdateState {
  isSuccess: boolean;
  isFail: boolean;
  updatedUser?: UserDataPayload;
  isUpdateLoading: boolean;
}

const initialState: UpdateState = {
  isSuccess: false,
  isFail: false,
  updatedUser: undefined,
  isUpdateLoading: false,
};

const updateUser = createSlice({
  name: "updateUser",
  initialState: initialState,
  reducers: {
    update(state, _action: PayloadAction<UserDataPayload>) {
      state.isUpdateLoading = true;
    },
    updateSuccess(state, action: PayloadAction<UserDataPayload>) {
      state.isSuccess = true;
      state.isUpdateLoading = false;
      state.updatedUser = action.payload;
    },
    updateFail(state, _action: PayloadAction<string>) {
      state.isFail = true;
      state.isSuccess = false;
      state.isUpdateLoading = false;
      state.updatedUser = undefined;
    },
    resetUpdate(state) {
      state.isSuccess = false;
    },
  },
});

export const updateUserActions = updateUser.actions;
//reducer
export default updateUser.reducer;
