import {
  SET_FEED_ARTICLES,
  SET_GLOBAL_ARTICLES,
  SET_PERSONAL_ARTICLES,
  SET_FAVORITED_ARTICLES,
} from "../constant";

interface Article {
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
}

interface ProductDataState {
  articles: Article[];
}

const initialState: ProductDataState = {
  articles: [],
};

export const articleData = (
  state: ProductDataState = initialState,
  action: { type: string; payload: Article[] }
) => {
  switch (action.type) {
    case SET_FEED_ARTICLES:
      return action.payload;

    case SET_GLOBAL_ARTICLES:
      return action.payload;

    case SET_PERSONAL_ARTICLES:
      return action.payload;

    case SET_FAVORITED_ARTICLES:
      return action.payload;

    default:
      return state;
  }
};
