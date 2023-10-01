import axios from "axios";
import { put, call, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  deleteComment,
  deleteCommentSuccess,
  deleteCommentFail,
} from "./deleteCommentSlice";

const deleteAnComment = (action: PayloadAction) => {
  try {
    return axios.delete(
      `https://api.realworld.io/api/articles/${action.payload.slug}/comments/${action.payload.id}`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("access_token")}`,
        },
        data: {
          id: action.payload.id,
        },
      }
    );
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};

export function* deleteAnCommentHandler(action: PayloadAction): unknown {
  try {
    yield call(deleteAnComment, action);
    yield put(deleteCommentSuccess(action.payload.id));
  } catch (error) {
    console.log(error);

    yield put(deleteCommentFail((error as Error).message));
  }
}

export function* deleteCommentSaga() {
  yield takeEvery(deleteComment.type, deleteAnCommentHandler);
}
