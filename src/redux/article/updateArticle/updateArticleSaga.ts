import { put, call, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
  updateAnArticle,
  updateAnArticleSuccess,
  updateAnArticleFail,
} from "./updateArticleSlice";
import { Article } from "../../../models/article";
import { TakeableChannel } from "redux-saga";

async function updateArticle(action: {
  payload: {
    article: Article;
    slug: string;
  };
}) {
  try {
    return await axios.put(
      `https://api.realworld.io/api/articles/${action.payload.slug}`,
      { article: action.payload.article },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("access_token")}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function* handleUpdateArticle(action: {
  payload: {
    article: Article;
    slug: string;
  };
}): unknown {
  try {
    const response = yield call(updateArticle, action);
    if (response.status === 200)
      window.location.href = `/article/${response.data.article.slug}`;
    yield put(updateAnArticleSuccess(response.data.article));
  } catch (error) {
    yield put(updateAnArticleFail((error as Error).message));
  }
}

export function* updateArticleSaga() {
  yield takeEvery(
    updateAnArticle.type as unknown as TakeableChannel<unknown>,
    handleUpdateArticle
  );
}
