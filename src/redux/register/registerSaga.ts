import { fork, take, put, call } from "redux-saga/effects";
import { RegisterPayload, registerActions } from "./registerSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

function createNewUser(payload: RegisterPayload) {
  const newUser = {
    user: payload,
  };
  return axios.post("https://api.realworld.io/api/users", newUser);
}

function* handleSignUp(payload: RegisterPayload): unknown {
  try {
    const response = yield call(createNewUser, payload);
    console.log(response);
    yield put(registerActions.registerSuccess(response.data.user));
  } catch (error) {
    yield put(registerActions.registerFail((error as Error).message));
  }
}

function* watchingRegisterFlow() {
  while (true) {
    const action: PayloadAction<RegisterPayload> = yield take(
      registerActions.signup.type
    );
    yield fork(handleSignUp, action.payload);
  }
}

export function* registerSaga() {
  yield fork(watchingRegisterFlow);
}
