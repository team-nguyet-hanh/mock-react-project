import { call, fork, take, put } from "redux-saga/effects";
import { LoginPayLoad, authActions } from "./authSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

function fetchUser(payload: object) {
    const user = {
        user: payload
      }
  return axios.post("https://api.realworld.io/api/users/login", user);
}

function* handleLogin(payload: LoginPayLoad):unknown {
  try {
    const res = yield call(fetchUser, payload);
    localStorage.setItem("access_token", res.data.user.token);
    console.log(res);
    yield put(authActions.loginSuccess(res.data.user))
  } catch (errors) {
    yield put(authActions.loginFail(errors.message));
  }
}

function* handleLogout() {
  yield localStorage.removeItem("access_token");
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
