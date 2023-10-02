import { PayloadAction } from "@reduxjs/toolkit";
import { getProfile, getProfileSuccess, getProfileFail } from "./profleSlice";
import axios from "axios";
import { put, call, takeLatest } from "redux-saga/effects";

const fetchProfile = (payload: unknown) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    return axios.get(`https://api.realworld.io/api/profiles/${payload}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("access_token")}`,
      },
    });
  } else {
    return axios.get(`https://api.realworld.io/api/profiles/${payload}`);
  }
};

// payload from user will pass here
function* handleProfile(action: PayloadAction): unknown {
  try {
    const profile = yield call(fetchProfile, action.payload);
    // localStorage.setItem("current_user", profile.data.profile.username);
    yield put(getProfileSuccess(profile.data));
  } catch (error) {
    yield put(getProfileFail((error as Error).message));
  }
}
export function* profileSaga() {
  yield takeLatest(getProfile.type, handleProfile);
}
