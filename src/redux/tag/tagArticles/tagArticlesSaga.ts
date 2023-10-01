import axios from "axios";
import { put, call, takeLatest } from "redux-saga/effects";
import {
  getTagArticles,
  getTagArticlesSuccess,
  getTagArticlesFail,
} from "./tagArticlesSlice";
import { TakeableChannel } from "redux-saga";

const fetchTagArticles = (action: {
  payload: { offset: number; tag: string };
}) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    return axios.get(
      `https://api.realworld.io/api/articles?limit=10&offset=${action.payload.offset}&tag=${action.payload.tag}`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("access_token")}`,
        },
      }
    );
  } else {
    return axios.get(
      `https://api.realworld.io/api/articles?limit=10&offset=${action.payload.offset}&tag=${action.payload.tag}`
    );
  }
};

function* handleTagArticles(action: {
  payload: { offset: number; tag: string };
}): unknown {
  try {
    const articles = yield call(fetchTagArticles, action);
    yield put(getTagArticlesSuccess(articles.data));
  } catch (error) {
    yield put(getTagArticlesFail((error as Error).message));
  }
}

export function* tagArticlesSaga() {
  yield takeLatest(
    getTagArticles.type as unknown as TakeableChannel<unknown>,
    handleTagArticles
  );
}
