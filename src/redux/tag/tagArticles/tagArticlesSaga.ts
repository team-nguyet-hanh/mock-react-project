import axios from "axios";
import { put, call, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  getTagArticles,
  getTagArticlesSuccess,
  getTagArticlesFail,
} from "./tagArticlesSlice";

const fetTagArticles = (action: PayloadAction) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    return axios.get(
      `https://api.realworld.io/api/articles?limit=10&offset=${action.payload.offset}&tag=${action.payload.tag}`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("access_token")}`,
        },
      }
    );
  } else {
    return axios.get(
      `https://api.realworld.io/api/articles?limit=10&offset=${action.payload.offset}&tag=${action.payload.tag}`
    );
  }
};

function* handleTagArticles(action: PayloadAction): unknown {
  try {
    const articles = yield call(fetTagArticles, action);
    yield put(getTagArticlesSuccess(articles.data));
  } catch (error) {
    yield put(getTagArticlesFail((error as Error).message));
  }
}

export function* tagArticlesSaga() {
  yield takeLatest(getTagArticles.type, handleTagArticles);
}
