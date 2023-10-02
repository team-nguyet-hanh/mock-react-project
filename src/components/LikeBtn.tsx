import { FavoriteArticle } from "../models/favoriteArticle";
import { useDispatch, useSelector } from "react-redux";
import { FavoriteState, like, unlike } from "../redux/favorite/favoriteSlice";
import LikeBtnStyle from "./LikeBtn.module.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function LikeBtn({ article, isListItem }: any) {
  const dispatch = useDispatch();
  const access_token = localStorage.getItem("access_token");

  const favoritedArticle = useSelector(
    (state: { favorite: FavoriteState }) => state.favorite.favoriteArticleUpdate
  );

  const handleFavorite = (article: FavoriteArticle) => {
    if (access_token) {
      const existingArticle = favoritedArticle.find(
        (item) => item.slug === article?.slug
      );
      // chưa like
      if (!existingArticle) {
        if (article?.favorited) {
          dispatch(unlike(article?.slug));
        } else {
          dispatch(like(article?.slug));
        }
      } else {
        if (existingArticle.favorited) {
          dispatch(unlike(article?.slug));
        } else {
          dispatch(like(article?.slug));
        }
      }
    } else {
      window.location.href = "/register";
    }
  };
  const showFavCount = (article: FavoriteArticle) => {
    const existingArticle = favoritedArticle.find(
      (item) => item.slug === article?.slug
    );
    if (!existingArticle) {
      return article?.favoritesCount;
    } else {
      return existingArticle?.favoritesCount;
    }
  };

  const showFavoriteStatus = (article: FavoriteArticle) => {
    const existingArticle = favoritedArticle.find(
      (item) => item.slug === article?.slug
    );
    if (!existingArticle) {
      return article?.favorited ? LikeBtnStyle.like : LikeBtnStyle.unlike;
    } else {
      return existingArticle.favorited
        ? LikeBtnStyle.like
        : LikeBtnStyle.unlike;
    }
  };

  const showFavoriteStatusAnArticle = (article: FavoriteArticle) => {
    const existingArticle = favoritedArticle.find(
      (item) => item.slug === article?.slug
    );
    if (!existingArticle) {
      return article?.favorited ? "Unfavorite" : "Favorite";
    } else {
      return existingArticle.favorited ? "Unfavorite" : "Favorite";
    }
  };

  return (
    <>
      <div
        className={showFavoriteStatus(article)}
        onClick={() => handleFavorite(article)}
      >
        {!isListItem ? (
          showFavoriteStatusAnArticle(article)
        ) : (
          <i className={`fa-solid fa-heart`}></i>
        )}
        {` ${showFavCount(article)}`}
      </div>
    </>
  );
}
