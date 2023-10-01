import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { Article } from "../../../models/article";

export type TagArticlesState = {
  isLoading: boolean;
  isSuccess: boolean;
  isFail: boolean;
  articles: Article[] | undefined;
  articleCount: number;
};

const initialTagArticlesState: TagArticlesState = {
  isLoading: false,
  isSuccess: false,
  isFail: false,
  articles: undefined,
  articleCount: 0,
};

const TagArticlesSlice = createSlice({
  name: "tagArticles",
  initialState: initialTagArticlesState,
  reducers: {
    getTagArticles(
      state,
      _action: {
        payload: { offset: number; tag: string };
      }
    ) {
      state.isLoading = true;
      state.isSuccess = false;
    },

    getTagArticlesSuccess(state, action) {
      state.isSuccess = true;
      state.isLoading = false;
      state.articles = action.payload.articles;
      state.articleCount = action.payload.articlesCount;
    },

    getTagArticlesFail(state, _action: PayloadAction<string>) {
      state.isFail = true;
      state.isLoading = false;
    },
  },
});

export const { getTagArticles, getTagArticlesSuccess, getTagArticlesFail } =
  TagArticlesSlice.actions;
export default TagArticlesSlice;
