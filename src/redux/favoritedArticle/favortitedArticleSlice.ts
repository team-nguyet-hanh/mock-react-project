import { createSlice } from "@reduxjs/toolkit";
import { FavoriteArticle } from "../../models/favoriteArticle";
import { PayloadAction } from "@reduxjs/toolkit";

export interface FavoriteArticlePayload {
  slug: string;
}

export interface FavoriteArticleState {
  isLoading: boolean;
  isSuccess: boolean;
  isFail: boolean;
  articles: FavoriteArticle | undefined;
  articleCount: number;
}

export interface MyArticlePayload {
  author: string | undefined;
  offset: number
}

export interface MyFavArticlePayload {
  favorited: string | undefined;
  offset: number
}

const initialFavoriteState: FavoriteArticleState = {
  isLoading: false,
  isSuccess: false,
  isFail: false,
  articles: undefined,
  articleCount: 0,
};

const FavoritedArticleSlice = createSlice({
  name: "favoritedArticles",
  initialState: initialFavoriteState,
  reducers: {
    getFavoritedArticles(state, _action: PayloadAction<MyFavArticlePayload>) {
      state.isLoading = true;
      state.isSuccess = false;
    },
    getFavoritedArticlesSuccess(state, action) {
      state.isSuccess = true;
      state.isLoading = false;
      state.articles = action.payload.articles;
      state.articleCount = action.payload.articlesCount;
    },
    getFavoritedArticlesFail(state, _action: PayloadAction<string>) {
      state.isFail = true;
      state.isLoading = false;
    },
    getMyArticle(state, _action: PayloadAction<MyArticlePayload>) {
      state.isLoading = true;
      state.isSuccess = false;
    },
    getMyArticleSuccess(state, action) {
      state.isSuccess = true;
      state.isLoading = false;
      state.articles = action.payload.articles;
      state.articleCount = action.payload.articlesCount;
    },
    getMyArticleFail(state, _action: PayloadAction<string>) {
      state.isFail = true;
      state.isLoading = false;
    },
  },
});

export const {
  getFavoritedArticles,
  getFavoritedArticlesSuccess,
  getFavoritedArticlesFail,
  getMyArticle,
  getMyArticleSuccess,
  getMyArticleFail,
} = FavoritedArticleSlice.actions;
export default FavoritedArticleSlice;
