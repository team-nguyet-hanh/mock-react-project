import { createSlice } from "@reduxjs/toolkit";
import { Article } from "../../../models/article";
import { PayloadAction } from "@reduxjs/toolkit";

export type ReadArticlesState = {
  isLoading: boolean;
  isSuccess: boolean;
  isFail: boolean;
  articles: Article[] | undefined;
  articleCount: number;
};

const initialReadArticlesState: ReadArticlesState = {
  isLoading: false,
  isSuccess: false,
  isFail: false,
  articles: undefined,
  articleCount: 0,
};

const ReadArticlesSlice = createSlice({
  name: "readArticles",
  initialState: initialReadArticlesState,
  reducers: {
    getGlobalArticle(state, _action: PayloadAction<number>) {
      state.isLoading = true;
      state.isSuccess = false;
    },

    getGlobalArticleSuccess(state, action) {
      state.isSuccess = true;
      state.isLoading = false;
      state.articles = action.payload.articles;
      state.articleCount = action.payload.articlesCount;
    },

    getGlobalArticleFail(state, _action: PayloadAction<string>) {
      state.isFail = true;
      state.isLoading = false;
    },

    getFeedArticle(state, _action: PayloadAction<number>) {
      state.isLoading = true;
      state.isSuccess = false;
    },

    getFeedArticleSuccess(state, action) {
      state.isSuccess = true;
      state.isLoading = false;
      state.articles = action.payload.articles;
      state.articleCount = action.payload.articlesCount;
    },

    getFeedArticleFail(state, _action: PayloadAction<string>) {
      state.isFail = true;
      state.isLoading = false;
    },
  },
});

export const {
  getGlobalArticle,
  getGlobalArticleSuccess,
  getGlobalArticleFail,
  getFeedArticle,
  getFeedArticleFail,
  getFeedArticleSuccess,
} = ReadArticlesSlice.actions;
export default ReadArticlesSlice;
