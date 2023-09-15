import { takeEvery, put } from "redux-saga/effects";
import {
  CREATE_ARTICLE,
  DELETE_ARTICLE,
  UPDATE_ARTICLE,
  SET_GLOBAL_ARTICLES,
  GET_GLOBAL_ARTICLES,
  SET_FEED_ARTICLES,
  GET_FEED_ARTICLES,
} from "../constant";
import Article from "../../pages/ArticleID";

type ArticlePost = {
  title: string;
  description: string;
  body: string;
  tagList: string[];
};

type ArticleUpdate = { title: string; description: string; body: string };

type Article = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
};

function* createArticle(action: {
  type: string;
  payload: { article: ArticlePost };
}): Generator<Promise<Response>, void, Response> {
  try {
    const { article } = action.payload;
    const response: Response = yield fetch(
      "https://api.realworld.io/api/articles",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(article),
      }
    );
    if (!response.ok) {
      throw new Error(`Error creating article: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}

function* deleteArticle(action: {
  type: string;
  payload: { slug: string };
}): Generator<Promise<Response>, void, Response> {
  try {
    const { slug } = action.payload;
    const response: Response = yield fetch(
      `https://api.realworld.io/api/articles/${slug}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`Error deleting article: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}

function* updateArticle(action: {
  type: string;
  payload: {
    slug: string;
    newArticle: ArticleUpdate;
  };
}): Generator<Promise<Response>, void, Response> {
  try {
    const { slug, newArticle } = action.payload;
    const response = yield fetch(
      `https://api.realworld.io/api/articles/${slug}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ article: newArticle }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error updating article: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}

function* getGlobalArticles(action: {
  type: string;
  payload: {
    offset: number;
  };
}) {
  try {
    const { offset } = action.payload;
    const articles: Response = yield fetch(
      `https://api.realworld.io/api/articles?articles?limit=10&offset=${offset}`
    );

    if (!articles.ok) {
      throw new Error(`Failed to fetch global articles: ${articles.status}`);
    }

    const globalArticles: Article[] = yield articles.json();
    yield put({ type: SET_GLOBAL_ARTICLES, payload: globalArticles });
  } catch (error) {
    console.error(error);
  }
}

function* getFeedArticles() {
  const articles: Response = yield fetch(
    "https://api.realworld.io/api/articles/feed"
  );
  const feedArticle: Article[] = yield articles.json();
  yield put({ type: SET_FEED_ARTICLES, payload: feedArticle });
}

function* articleSaga(): Generator {
  yield takeEvery(CREATE_ARTICLE, createArticle);
  yield takeEvery(DELETE_ARTICLE, deleteArticle);
  yield takeEvery(UPDATE_ARTICLE, updateArticle);
  yield takeEvery(GET_GLOBAL_ARTICLES, getGlobalArticles);
  yield takeEvery(GET_FEED_ARTICLES, getFeedArticles);
}
export default articleSaga;
