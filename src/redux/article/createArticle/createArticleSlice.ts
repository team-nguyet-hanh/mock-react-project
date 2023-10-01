import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { Article, ArticlePost } from "../../../models/article";

type CreateArticleState = {
  isLoading: boolean;
  isSuccess: boolean;
  isFail: boolean;
  createdArticle: Article | undefined;
  failMessage: string;
};

const initialCreateState: CreateArticleState = {
  isLoading: false,
  isSuccess: false,
  isFail: false,
  createdArticle: undefined,
  failMessage: "",
};

const CreateArticleSlice = createSlice({
  name: "createArticle",
  initialState: initialCreateState,
  reducers: {
    createArticle(state, _action: PayloadAction<ArticlePost>) {
      state.isLoading = true;
    },
    createArticleSuccess(state, action: PayloadAction<Article>) {
      state.isSuccess = true;
      state.isLoading = false;
      state.createdArticle = action.payload;
    },
    createArticleFail(state, _action: PayloadAction<string>) {
      state.isFail = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.failMessage = "Title must be unique.";
    },
  },
});

export const { createArticle, createArticleFail, createArticleSuccess } =
  CreateArticleSlice.actions;
export default CreateArticleSlice;
