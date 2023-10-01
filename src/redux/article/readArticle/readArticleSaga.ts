import axios from "axios";
import { put, call, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  getGlobalArticle,
  getGlobalArticleSuccess,
  getGlobalArticleFail,
  getFeedArticle,
  getFeedArticleFail,
  getFeedArticleSuccess,
} from "./readArticleSlice";

const fetchGlobalArticle = (action: PayloadAction) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    return axios.get(
      `https://api.realworld.io/api/articles?limit=10&offset=${action.payload}`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("access_token")}`,
        },
      }
    );
  } else {
    return axios.get(
      `https://api.realworld.io/api/articles?limit=10&offset=${action.payload}`
    );
  }
};

function* handleGlobalArticles(payload: PayloadAction): unknown {
  try {
    const favorite = yield call(fetchGlobalArticle, payload);
    yield put(getGlobalArticleSuccess(favorite.data));
  } catch (error) {
    yield put(getGlobalArticleFail((error as Error).message));
  }
}

const fetchFeedArticle = (action: PayloadAction) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    return axios.get(
      `https://api.realworld.io/api/articles/feed?limit=10&offset=${action.payload}`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("access_token")}`,
        },
      }
    );
  } else {
    return axios.get(
      `https://api.realworld.io/api/articles/feed?limit=10&offset=${action.payload}`
    );
  }
};

function* handleFeedArticle(action: PayloadAction): unknown {
  try {
    const authorArticles = yield call(fetchFeedArticle, action);
    yield put(getFeedArticleSuccess(authorArticles.data));
  } catch (error) {
    yield put(getFeedArticleFail((error as Error).message));
  }
}

export function* readArticleSaga() {
  yield takeLatest(getGlobalArticle.type, handleGlobalArticles);
  yield takeLatest(getFeedArticle.type, handleFeedArticle);
}
