import {
  followFail,
  followSuccess,
  following,
  unfollowFail,
  unfollowSuccess,
  unfollowing,
} from "./followSlice";
import { takeEvery, put, call } from "redux-saga/effects";
import axios from "axios";
const fetchFollow = (payload: string) => {
  return axios.post(
    `https://api.realworld.io/api/profiles/${payload}/follow`,
    payload,
    {
      headers: {
        Authorization: `Token ${localStorage.getItem("access_token")}`,
      },
    }
  );
};
const fetchUnfollow = (payload: string) => {
  return axios.delete(
    `https://api.realworld.io/api/profiles/${payload}/follow`,
    {
      headers: {
        Authorization: `Token ${localStorage.getItem("access_token")}`,
      },
    }
  );
};

function* hanldeFollow(action: { type: string; payload: string }): unknown {
  try {
    const followRes = yield call(fetchFollow, action.payload);
    yield put(followSuccess(followRes.data.profile));
  } catch (error) {
    yield put(followFail((error as Error).message));
  }
}

function* hanldeUnfollow(action: { type: string; payload: string }): unknown {
  try {
    const unFollowRes = yield call(fetchUnfollow, action.payload);
    yield put(unfollowSuccess(unFollowRes.data.profile));
  } catch (error) {
    yield put(unfollowFail((error as Error).message));
  }
}

export function* followSaga() {
  yield takeEvery(following.type, hanldeFollow);
  yield takeEvery(unfollowing.type, hanldeUnfollow);
}
