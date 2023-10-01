import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { ArticleComment } from "../../../models/comment";

export type CreateCommentState = {
  isLoading: boolean;
  isSuccess: boolean;
  isFail: boolean;
  createdComment: ArticleComment[];
};

const initialCreateCommentSate: CreateCommentState = {
  isLoading: false,
  isSuccess: false,
  isFail: false,
  createdComment: [],
};

const CreateCommentSlice = createSlice({
  name: "createComment",
  initialState: initialCreateCommentSate,
  reducers: {
    createComment(state, _action: PayloadAction) {
      state.isLoading = true;
    },
    createCommentSuccess(state, action: PayloadAction<ArticleComment>) {
      state.isSuccess = true;
      state.isLoading = false;
      state.createdComment.push(action.payload.comment);
    },
    createCommentFail(state, _action: PayloadAction<string>) {
      state.isFail = true;
      state.isLoading = false;
    },
  },
});

export const { createComment, createCommentSuccess, createCommentFail } =
  CreateCommentSlice.actions;
export default CreateCommentSlice;
