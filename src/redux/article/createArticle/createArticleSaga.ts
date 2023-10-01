import { put, call, takeEvery } from "redux-saga/effects";
import {
  createArticle,
  createArticleFail,
  createArticleSuccess,
} from "./createArticleSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ArticlePost } from "../../../models/article";

const createAnArticle = async (action: PayloadAction<ArticlePost>) => {
  try {
    const response = await axios.post(
      `https://api.realworld.io/api/articles`,
      { article: action.payload },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("access_token")}`,
        },
      }
    );
    const articleSlug = response.data.article.slug;
    const articleDestination = `/article/${articleSlug}`;
    window.location.href = articleDestination;
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
};

export function* createArticleHandler(
  payload: PayloadAction<ArticlePost>
): unknown {
  try {
    const article = yield call(createAnArticle, payload);
    yield put(createArticleSuccess(article));
  } catch (error) {
    yield put(createArticleFail((error as Error).message));
  }
}

export function* createArticleSaga() {
  yield takeEvery(createArticle.type, createArticleHandler);
}
