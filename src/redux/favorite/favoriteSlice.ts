import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { FavoriteArticle } from "../../models/favoriteArticle";

export interface FavoritePayload {
  slug: string;
}

export interface FavoriteState {
  isLoading: boolean;
  isSuccess: boolean;
  isFail: boolean;
  favoriteArticleUpdate: FavoriteArticle[];
}

const initialFavoriteState: FavoriteState = {
  isLoading: false,
  isSuccess: false,
  isFail: false,
  favoriteArticleUpdate: [],
};

const FavoriteSlice = createSlice({
  name: "favorite",
  initialState: initialFavoriteState,
  reducers: {
    like(state, _action: PayloadAction<string>) {
      state.isLoading = true;
    },
    unlike(state, _action: PayloadAction<string>) {
      state.isLoading = true;
    },
    likeSuccess(state, action: PayloadAction<FavoriteArticle>) {
      state.isSuccess = true;
      state.isLoading = false;
      const updatedArticleId = action.payload.id;
      const existItem = state.favoriteArticleUpdate.find(
        (item) => item.id === updatedArticleId
      );
      if (!existItem) {
        state.favoriteArticleUpdate = [
          ...state.favoriteArticleUpdate,
          action.payload,
        ];
      } else {
        existItem.favorited = action.payload.favorited;
        existItem.favoritesCount = action.payload.favoritesCount;
      }
    },
    unlikeSuccess(state, action: PayloadAction<FavoriteArticle>) {
      state.isSuccess = true;
      state.isLoading = false;
      const updatedArticleId = action.payload.id;

      const existItem = state.favoriteArticleUpdate.find(
        (item) => item.id === updatedArticleId
      );
      if (!existItem) {
        state.favoriteArticleUpdate = [
          ...state.favoriteArticleUpdate,
          action.payload,
        ];
      } else {
        existItem.favorited = action.payload.favorited;
        existItem.favoritesCount = action.payload.favoritesCount;
      }
    },
    likeFail(state, _action: PayloadAction<string>) {
      state.isFail = true;
    },
    unlikeFail(state, _action: PayloadAction<string>) {
      state.isFail = false;
    },
  },
});

export const {
  like,
  unlike,
  likeSuccess,
  likeFail,
  unlikeSuccess,
  unlikeFail,
} = FavoriteSlice.actions;
export default FavoriteSlice;
