import axios from "axios";
import { put, call, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  getFavoritedArticles,
  getFavoritedArticlesSuccess,
  getFavoritedArticlesFail,
  getMyArticle,
  getMyArticleSuccess,
  getMyArticleFail,
  MyFavArticlePayload,
  MyArticlePayload,
} from "./favortitedArticleSlice";

const fetchFavArticles = (action: PayloadAction<MyFavArticlePayload>) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    return axios.get(
      `https://api.realworld.io/api/articles?favorited=${action.payload.favorited}&limit=5&offset=${action.payload.offset}`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("access_token")}`,
        },
      }
    );
  } else {
    return axios.get(
      `https://api.realworld.io/api/articles?favorited=${action.payload.favorited}&limit=5&offset=${action.payload.offset}`
    );
  }
};

function* handleFavArticles(action: PayloadAction<MyFavArticlePayload>): unknown {
  try {
    const favorite = yield call(fetchFavArticles, action);
    yield put(getFavoritedArticlesSuccess(favorite.data));
  } catch (error) {
    yield put(getFavoritedArticlesFail((error as Error).message));
  }
}

const fetchMyArticle = (action: PayloadAction<MyArticlePayload>) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    return axios.get(
      `https://api.realworld.io/api/articles?author=${action.payload.author}&limit=5&offset=${action.payload.offset}`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("access_token")}`,
        },
      }
    );
  } else {
    return axios.get(
      `https://api.realworld.io/api/articles?author=${action.payload.author}&limit=5&offset=${action.payload.offset}`
    );
  }
};

// payload from user will pass here
function* hanldeMyArticle(action: PayloadAction<MyArticlePayload>): unknown {
  try {
    const authorArticles = yield call(fetchMyArticle, action);
    yield put(getMyArticleSuccess(authorArticles.data));
  } catch (error) {
    yield put(getMyArticleFail((error as Error).message));
  }
}

export function* favoriteArticleSaga() {
  yield takeLatest(getFavoritedArticles.type, handleFavArticles);
  yield takeLatest(getMyArticle.type, hanldeMyArticle);
}
