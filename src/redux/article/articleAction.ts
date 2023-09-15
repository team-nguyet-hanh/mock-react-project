import {
  CREATE_ARTICLE,
  DELETE_ARTICLE,
  UPDATE_ARTICLE,
  GET_FEED_ARTICLES,
  GET_GLOBAL_ARTICLES,
  GET_AN_ARTICLE,
} from "../constant";

type ArticlePost = {
  title: string;
  description: string;
  body: string;
  tagList: string[];
};

export const createArticle = (payload: { article: ArticlePost }) => {
  return {
    type: CREATE_ARTICLE,
    payload,
  };
};

export const deleteArticle = (payload: { slug: string }) => {
  return {
    type: DELETE_ARTICLE,
    payload,
  };
};

export const updateArticle = (payload: {
  slug: string;
  newArticle: { title: string; description: string; body: string };
}) => {
  return {
    type: UPDATE_ARTICLE,
    payload,
  };
};

export const getFeedArticles = () => {
  return {
    type: GET_FEED_ARTICLES,
  };
};

export const getGlobalAticles = (payload: { offset: number }) => {
  return {
    type: GET_GLOBAL_ARTICLES,
    payload,
  };
};

export const getAnArticle = () => {
  return {
    type: GET_AN_ARTICLE,
  };
};
