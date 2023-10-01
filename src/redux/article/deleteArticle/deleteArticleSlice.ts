import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export interface DeleteArticleState {
  isLoading: boolean;
  isSuccess: boolean;
  isFail: boolean;
}

const initialDeleteArticleState: DeleteArticleState = {
  isLoading: false,
  isSuccess: false,
  isFail: false,
};

const DeleteArticleSlice = createSlice({
  name: "deleteArticle",
  initialState: initialDeleteArticleState,
  reducers: {
    deleteArticle(state, _action: PayloadAction<string>) {
      state.isLoading = true;
    },

    deleteArticleSuccess(state, _action: PayloadAction<string>) {
      state.isSuccess = true;
      state.isLoading = false;
    },

    deleteArticleFail(state, _action: PayloadAction<string>) {
      state.isFail = false;
    },
  },
});

export const { deleteArticle, deleteArticleSuccess, deleteArticleFail } =
  DeleteArticleSlice.actions;
export default DeleteArticleSlice;
