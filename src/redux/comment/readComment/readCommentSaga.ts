import axios from "axios";
import { put, call, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  getArticleComment,
  getArticleCommentSuccess,
  getArticleCommentFail,
} from "./readCommentSlice";

const fetchArticleComment = (action: PayloadAction) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    return axios.get(
      `https://api.realworld.io/api/articles/${action.payload}/comments`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("access_token")}`,
        },
      }
    );
  } else {
    return axios.get(
      `https://api.realworld.io/api/articles/${action.payload}/comments`
    );
  }
};

function* handleArticleComment(action: PayloadAction): unknown {
  try {
    const comment = yield call(fetchArticleComment, action);
    yield put(getArticleCommentSuccess(comment.data));
  } catch (error) {
    yield put(getArticleCommentFail((error as Error).message));
  }
}

export function* articleCommentSaga() {
  yield takeLatest(getArticleComment.type, handleArticleComment);
}
