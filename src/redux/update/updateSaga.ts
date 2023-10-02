import { fork, take, put, call } from "redux-saga/effects";
import axios from "axios";
import { UserDataPayload, updateUserActions } from "./updateSlice";
import { PayloadAction } from "@reduxjs/toolkit";

function onUpdateUser(payload: UserDataPayload) {
  const user = {
    user: payload,
  };
  return axios.put("https://api.realworld.io/api/user", user, {
    headers: {
      Authorization: `Token ${localStorage.getItem("access_token")}`,
    },
  });
}

function* handleUpdate(payload: UserDataPayload): unknown {
  try {
    const response = yield call(onUpdateUser, payload);
    localStorage.setItem("access_token", response.data.user.token);
    localStorage.setItem("user_name", response.data.user.username);
    yield put(updateUserActions.updateSuccess(response.data.user));
  } catch (error) {
    yield put(updateUserActions.updateFail((error as Error).message));
  }
}

function* watchingUpdateUSerFlow() {
  while (true) {
    const action: PayloadAction<UserDataPayload> = yield take(
      updateUserActions.update.type
    );
    yield fork(handleUpdate, action.payload);
  }
}

export function* updateUserSaga() {
  yield fork(watchingUpdateUSerFlow);
}
