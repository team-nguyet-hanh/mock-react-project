import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArticleUpdate } from "../../../models/article";

export type RegisterState = {
  isSuccess: boolean;
  isFail: boolean;
  isUpdateLoading: boolean;
  updatedArticle: ArticleUpdate | undefined;
  failMessage: string;
};

const initialRegisterState: RegisterState = {
  isSuccess: false,
  isFail: false,
  isUpdateLoading: false,
  updatedArticle: undefined,
  failMessage: "",
};

const updateArticleSlice = createSlice({
  name: "updateArticle",
  initialState: initialRegisterState,
  reducers: {
    updateAnArticle(
      state,
      _action: {
        payload: {
          article: ArticleUpdate;
          slug: string;
        };
      }
    ) {
      state.isUpdateLoading = true;
    },
    updateAnArticleSuccess(state, action) {
      console.log(action);
      state.isSuccess = true;
      state.isUpdateLoading = false;
      state.updatedArticle = action.payload;
    },
    updateAnArticleFail(state, _action: PayloadAction<string>) {
      state.isFail = true;
      state.isSuccess = false;
      state.isUpdateLoading = false;
      state.failMessage = "Title must be unique.";
    },
  },
});

export const { updateAnArticle, updateAnArticleSuccess, updateAnArticleFail } =
  updateArticleSlice.actions;
export default updateArticleSlice;
