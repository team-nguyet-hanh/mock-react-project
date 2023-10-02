import axios from "axios";
import { put, call, takeLatest } from "redux-saga/effects";
import {
  getCurrentUser,
  getCurrentUserFail,
  getCurrentUserSuccess,
} from "./currentUserSlice";

const fetchCurrentUser = () => {
  return axios.get(`https://api.realworld.io/api/user`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("access_token")}`,
    },
  });
};

// payload from user will pass here
function* handleCurrentUser(): unknown {
  try {
    const response = yield call(fetchCurrentUser);
    // localStorage.setItem("current_user", profile.data.profile.username);
    yield put(getCurrentUserSuccess(response.data.user));
  } catch (error) {
    yield put(getCurrentUserFail((error as Error).message));
  }
}
export function* currentUserSaga() {
  yield takeLatest(getCurrentUser.type, handleCurrentUser);
}
