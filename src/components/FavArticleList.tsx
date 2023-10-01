import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFavoritedArticles,
  getMyArticle,
} from "../redux/favoritedArticle/favortitedArticleSlice";
import { useLocation, useParams } from "react-router-dom";
import { FavoriteArticle } from "../models/favoriteArticle";
import CustomUserPagination from "../components/UserPagination";
import { UpdateState } from "../redux/update/updateSlice";
import { Spinner, Table } from "react-bootstrap";
import ArticleItem from "./ArticleItem";
import FavListStyle from "./FavArticleList.module.css";

export default function FavArticleList() {
  const [offset, getOffSet] = useState(0);
  // const [activePage, setActivePage] = useState(1);
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const currentUser: string | undefined = useParams().userId;

  const currentArticle: FavoriteArticle[] = useSelector(
    (state: { favoritedArticles: { articles: FavoriteArticle[] } }) =>
      state.favoritedArticles.articles
  );
  const updatedUser = useSelector(
    (state: { updateUser: UpdateState }) => state.updateUser.isUpdateLoading
  );

  const isLoadingArticles = useSelector(
    (state: { favoritedArticles: { isLoading: boolean } }) =>
      state.favoritedArticles.isLoading
  );

  useEffect(() => {
    if (!updatedUser) {
      location.includes("favorites")
        ? dispatch(
            getFavoritedArticles({ favorited: currentUser, offset: offset })
          )
        : dispatch(getMyArticle({ author: currentUser, offset: offset }));
    }
  }, [currentUser, dispatch, location, offset, updatedUser]);

  useEffect(() => {
    getOffSet(0);
  }, [location]);

  return (
    <>
      <Table className={`${FavListStyle.favList}`}>
        <tbody>
          {isLoadingArticles ? (
            <tr>
              <td>
                <Spinner className={FavListStyle.spinner} />
              </td>
            </tr>
          ) : currentArticle?.length ? (
            currentArticle?.map((article) => (
              <tr key={article.slug}>
                <ArticleItem article={article} />
              </tr>
            ))
          ) : (
            <p className="text-center fs-5 m-3">No article</p>
          )}
        </tbody>
      </Table>
      <CustomUserPagination handleOffSet={getOffSet} />
    </>
  );
}
