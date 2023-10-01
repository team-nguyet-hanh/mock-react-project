import { authSaga } from "./authen/authSaga";

import { all } from "redux-saga/effects";

import { registerSaga } from "./register/registerSaga";

import { updateUserSaga } from "./update/updateSaga";

import { favoriteSaga } from "./favorite/favoriteSaga";

import { favoriteArticleSaga } from "./favoritedArticle/favoritedArticleSaga";

import { profileSaga } from "./profile/profileSaga";

import { currentUserSaga } from "./currentUser/currentUserSaga";

import { followSaga } from "./follow/followSaga";

import { readArticleSaga } from "./article/readArticle/readArticleSaga";

import { tagsSaga } from "./tag/tagsHome/tagsHomeSaga";

import { tagArticlesSaga } from "./tag/tagArticles/tagArticlesSaga";

import { anArticleSaga } from "./article/anArticle/anArticleSaga";

import { createArticleSaga } from "./article/createArticle/createArticleSaga";

import { articleCommentSaga } from "./comment/readComment/readCommentSaga";

import { createCommentSaga } from "./comment/createComment/createCommentSaga";

import { deleteArticleSaga } from "./article/deleteArticle/deleteArticleSaga";

import { deleteCommentSaga } from "./comment/deleteComment/deleteCommentSaga";

import { updateArticleSaga } from "./article/updateArticle/updateArticleSaga";

export default function* rootSaga() {
  yield all([
    authSaga(),

    registerSaga(),

    updateUserSaga(),

    favoriteSaga(),

    favoriteArticleSaga(),

    followSaga(),

    profileSaga(),

    currentUserSaga(),

    readArticleSaga(),

    tagsSaga(),

    tagArticlesSaga(),

    anArticleSaga(),

    createArticleSaga(),

    articleCommentSaga(),

    createCommentSaga(),

    deleteArticleSaga(),

    deleteCommentSaga(),

    updateArticleSaga(),
  ]);
}
