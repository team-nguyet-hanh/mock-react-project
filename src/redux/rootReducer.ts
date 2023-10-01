import { combineReducers } from "redux";

import authReducer from "./authen/authSlice";

import registerReducer from "./register/registerSlice";

import updateUserReducer from "./update/updateSlice";

import FavoritedArticleSlice from "./favoritedArticle/favortitedArticleSlice";

import FavoriteSlice from "./favorite/favoriteSlice";

import ProfileSlice from "./profile/profleSlice";

import CurrentUserSlice from "./currentUser/currentUserSlice";

import FollowSlice from "./follow/followSlice";

import ReadArticlesSlice from "./article/readArticle/readArticleSlice";

import TagsSlice from "./tag/tagsHome/tagsHomeSlice";

import TagArticlesSlice from "./tag/tagArticles/tagArticlesSlice";

import AnArticleSlice from "./article/anArticle/anArticleSlice";

import createArticleSlice from "./article/createArticle/createArticleSlice";

import ArticleCommentSlice from "./comment/readComment/readCommentSlice";

import CreateCommentSlice from "./comment/createComment/createCommentSlice";

import DeleteArticleSlice from "./article/deleteArticle/deleteArticleSlice";

import DeleteCommentSlice from "./comment/deleteComment/deleteCommentSlice";

import updateArticleSlice from "./article/updateArticle/updateArticleSlice";

export default combineReducers({
  auth: authReducer,

  register: registerReducer,

  updateUser: updateUserReducer,

  favorite: FavoriteSlice.reducer,

  favoritedArticles: FavoritedArticleSlice.reducer,

  profile: ProfileSlice.reducer,

  follow: FollowSlice.reducer,

  currentUser: CurrentUserSlice.reducer,

  readArticle: ReadArticlesSlice.reducer,

  tagsHome: TagsSlice.reducer,

  tagArticles: TagArticlesSlice.reducer,

  anArticle: AnArticleSlice.reducer,

  createArticle: createArticleSlice.reducer,

  articleComments: ArticleCommentSlice.reducer,

  createComment: CreateCommentSlice.reducer,

  deleteArticle: DeleteArticleSlice.reducer,

  deleteComment: DeleteCommentSlice.reducer,

  updateArticle: updateArticleSlice.reducer,
});
