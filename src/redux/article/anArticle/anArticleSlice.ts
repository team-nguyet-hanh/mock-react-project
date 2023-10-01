import { createSlice } from "@reduxjs/toolkit";
import { Article } from "../../../models/article";
import { PayloadAction } from "@reduxjs/toolkit";

export type AnArticleState = {
  isLoading: boolean;
  isSuccess: boolean;
  isFail: boolean;
  article: Article | undefined;
};

const initialAnArticleState: AnArticleState = {
  isLoading: false,
  isSuccess: false,
  isFail: false,
  article: undefined,
};

const AnArticleSlice = createSlice({
  name: "anArticle",
  initialState: initialAnArticleState,
  reducers: {
    getAnArticle(state, _action: PayloadAction<string>) {
      state.isLoading = true;
      state.isSuccess = false;
    },

    getAnArticleSuccess(state, action) {
      state.isSuccess = true;
      state.isLoading = false;
      state.article = action.payload.article;
    },

    getAnArticleFail(state, _action: PayloadAction<string>) {
      state.isFail = true;
      state.isLoading = false;
    },
  },
});

export const { getAnArticle, getAnArticleSuccess, getAnArticleFail } =
  AnArticleSlice.actions;

export default AnArticleSlice;
