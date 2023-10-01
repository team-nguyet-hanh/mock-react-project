import axios from "axios";
import { put, call, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  deleteArticle,
  deleteArticleSuccess,
  deleteArticleFail,
} from "./deleteArticleSlice";

const deleteAnArticle = async (action: PayloadAction) => {
  try {
    await axios.delete(
      `https://api.realworld.io/api/articles/${action.payload}`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("access_token")}`,
        },
      }
    );
    window.location.href = "/";
  } catch (error) {
    console.error("Error deleting article:", error);
  }
};

export function* deleteAnArticleHandler(action: PayloadAction): unknown {
  try {
    const deletedAticle = yield call(deleteAnArticle, action);
    yield put(deleteArticleSuccess(deletedAticle.data));
  } catch (error) {
    yield put(deleteArticleFail((error as Error).message));
  }
}

export function* deleteArticleSaga() {
  yield takeEvery(deleteArticle.type, deleteAnArticleHandler);
}
