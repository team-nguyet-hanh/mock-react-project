import axios from "axios";
import { put, call, takeEvery } from "redux-saga/effects";

import {
  like,
  likeFail,
  likeSuccess,
  unlike,
  unlikeFail,
  unlikeSuccess,
} from "./favoriteSlice";

import { PayloadAction } from "@reduxjs/toolkit";

const likeAPost = (action: PayloadAction) => {
  return axios.post(
    `https://api.realworld.io/api/articles/${action.payload}/favorite`,
    action.payload,
    {
      headers: {
        Authorization: `Token ${localStorage.getItem("access_token")}`,
      },
    }
  );
};

const unlikeApost = (action: PayloadAction) => {
  return axios.delete(
    `https://api.realworld.io/api/articles/${action.payload}/favorite`,
    {
      headers: {
        Authorization: `Token ${localStorage.getItem("access_token")}`,
      },
    }
  );
};

export function* likeHandler(action: PayloadAction): unknown {
  try {
    const favorite = yield call(likeAPost, action);
    yield put(likeSuccess(favorite.data.article));
  } catch (error) {
    yield put(likeFail((error as Error).message));
  }
}

export function* unlikeHandler(action: PayloadAction): unknown {
  try {
    const unlike = yield call(unlikeApost, action);
    yield put(unlikeSuccess(unlike.data.article));
  } catch (error) {
    yield put(unlikeFail((error as Error).message));
  }
}

export function* favoriteSaga() {
  yield takeEvery(like.type, likeHandler);
  yield takeEvery(unlike.type, unlikeHandler);
}
