import axios from "axios";
import { put, call, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  createComment,
  createCommentSuccess,
  createCommentFail,
} from "./createCommentSlice";

const postComment = (action: PayloadAction) => {
  return axios.post(
    `https://api.realworld.io/api/articles/${action.payload.slug}/comments`,
    action.payload.comment,
    {
      headers: {
        Authorization: `Token ${localStorage.getItem("access_token")}`,
      },
    }
  );
};

export function* createCommentHandler(action: PayloadAction): unknown {
  try {
    const comment = yield call(postComment, action);
    yield put(createCommentSuccess(comment.data));
  } catch (error) {
    yield put(createCommentFail((error as Error).message));
  }
}

export function* createCommentSaga() {
  yield takeEvery(createComment.type, createCommentHandler);
}
