import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export interface DeleteCommentState {
  isLoading: boolean;
  isSuccess: boolean;
  isFail: boolean;
  deletedCommentId: number[];
}

const initialDeleteCommentState: DeleteCommentState = {
  isLoading: false,
  isSuccess: false,
  isFail: false,
  deletedCommentId: [],
};

const DeleteCommentSlice = createSlice({
  name: "deleteComment",
  initialState: initialDeleteCommentState,
  reducers: {
    deleteComment(state, _action: { payload: { slug: string; id: number } }) {
      state.isLoading = true;
    },

    deleteCommentSuccess(state, action: { payload: number }) {
      state.isSuccess = true;
      state.isLoading = false;
      state.deletedCommentId.push(action.payload);
    },

    deleteCommentFail(state, _action: PayloadAction<string>) {
      state.isFail = false;
    },
  },
});

export const { deleteComment, deleteCommentSuccess, deleteCommentFail } =
  DeleteCommentSlice.actions;
export default DeleteCommentSlice;
