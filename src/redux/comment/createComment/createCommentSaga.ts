import axios from "axios";
import { put, call, takeEvery } from "redux-saga/effects";

import {
  createComment,
  createCommentSuccess,
  createCommentFail,
} from "./createCommentSlice";
import { CommentPost } from "../../../models/comment";
import { TakeableChannel } from "redux-saga";

const postComment = (action: {
  payload: { comment: { comment: CommentPost }; slug: string };
}) => {
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

export function* createCommentHandler(action: {
  payload: { comment: { comment: CommentPost }; slug: string };
}): unknown {
  try {
    const comment = yield call(postComment, action);
    yield put(createCommentSuccess(comment.data));
  } catch (error) {
    yield put(createCommentFail((error as Error).message));
  }
}

export function* createCommentSaga() {
  yield takeEvery(
    createComment.type as unknown as TakeableChannel<unknown>,
    createCommentHandler
  );
}
