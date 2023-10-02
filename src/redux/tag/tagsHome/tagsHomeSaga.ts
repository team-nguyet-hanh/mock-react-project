import axios from "axios";
import { put, call, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import { getTags, getTagsSuccess, getTagsFail } from "./tagsHomeSlice";

const fetchTags = (_action: PayloadAction) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    return axios.get("https://api.realworld.io/api/tags", {
      headers: {
        Authorization: `Token ${localStorage.getItem("access_token")}`,
      },
    });
  } else {
    return axios.get("https://api.realworld.io/api/tags");
  }
};

function* handleGetTags(action: PayloadAction): unknown {
  try {
    const favorite = yield call(fetchTags, action);
    yield put(getTagsSuccess(favorite.data));
  } catch (error) {
    yield put(getTagsFail((error as Error).message));
  }
}

export function* tagsSaga() {
  yield takeLatest(getTags.type, handleGetTags);
}
