import axios from "axios";
import { put, call, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  getAnArticle,
  getAnArticleSuccess,
  getAnArticleFail,
} from "./anArticleSlice";

const fetchAnArticle = (action: PayloadAction) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    return axios.get(
      `https://api.realworld.io/api/articles/${action.payload}`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("access_token")}`,
        },
      }
    );
  } else {
    return axios.get(`https://api.realworld.io/api/articles/${action.payload}`);
  }
};

function* handleAnArticle(action: PayloadAction): unknown {
  try {
    const article = yield call(fetchAnArticle, action);
    yield put(getAnArticleSuccess(article.data));
  } catch (error) {
    yield put(getAnArticleFail((error as Error).message));
  }
}

export function* anArticleSaga() {
  yield takeLatest(getAnArticle.type, handleAnArticle);
}
