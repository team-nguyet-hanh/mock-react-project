import { call, fork, take, put } from "redux-saga/effects";
import { LoginPayLoad, authActions } from "./authSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

function fetchUserLogin(payload: object) {
  const user = {
    user: payload,
  };
  return axios.post("https://api.realworld.io/api/users/login", user);
}

function* handleLogin(payload: LoginPayLoad): unknown {
  try {
    const res = yield call(fetchUserLogin, payload);
    localStorage.setItem("access_token", res.data.user.token);
    localStorage.setItem("user_name", res.data.user.username);
    localStorage.setItem("image", res.data.user.image);
    console.log(res);
    yield put(authActions.loginSuccess(res.data.user));
  } catch (error) {
    yield put(authActions.loginFail((error as Error).message));
  }
}

function* handleLogout() {
  yield localStorage.removeItem("user_name");
  yield localStorage.removeItem("access_token");
  yield localStorage.removeItem("image");
  window.location.href = "/";
}

function* watchingLoggingFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem("access_token"));
    if (!isLoggedIn) {
      // đợi dispatch action: login
      const action: PayloadAction<LoginPayLoad> = yield take(
        authActions.login.type
      );
      // exceute handleLogin
      yield fork(handleLogin, action.payload);
    }
    yield take([authActions.logout.type, authActions.loginFail.type]);
    // dùng call để đợi thực hiện xong handleLogout mới quay lại vòng lặp
    yield call(handleLogout);
  }
}

export function* authSaga() {
  yield fork(watchingLoggingFlow);
}
