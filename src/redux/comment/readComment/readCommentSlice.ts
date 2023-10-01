import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { ArticleComment } from "../../../models/comment";

export type ArticleCommentState = {
  isLoading: boolean;
  isSuccess: boolean;
  isFail: boolean;
  comments: ArticleComment[] | undefined;
};

const initialArticleCommentState: ArticleCommentState = {
  isLoading: false,
  isSuccess: false,
  isFail: false,
  comments: undefined,
};

const ArticleCommentSlice = createSlice({
  name: "articleComments",
  initialState: initialArticleCommentState,
  reducers: {
    getArticleComment(state, _action: PayloadAction<string>) {
      state.isLoading = true;
      state.isSuccess = false;
    },

    getArticleCommentSuccess(state, action) {
      state.isSuccess = true;
      state.isLoading = false;
      state.comments = action.payload;
    },

    getArticleCommentFail(state, _action: PayloadAction<string>) {
      state.isFail = true;
      state.isLoading = false;
    },
  },
});

export const {
  getArticleComment,
  getArticleCommentSuccess,
  getArticleCommentFail,
} = ArticleCommentSlice.actions;
export default ArticleCommentSlice;
