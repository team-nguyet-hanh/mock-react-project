import React from "react";

import Table from "react-bootstrap/Table";

import { useSelector } from "react-redux";

import ArticleItem from "./ArticleItem";
import { Article } from "../models/article";

import ArticleListStyle from "./ArticleList.module.css";
import { Spinner } from "react-bootstrap";

type ArticlesListProps = {
  page: string;
};

const ArticlesList: React.FC<ArticlesListProps> = ({ page }) => {
  const articles = useSelector(
    (state: {
      readArticle: { articles: Article[] };
      tagArticles: { articles: Article[] };
    }) => {
      return page === "global-feed" || page === "your-feed"
        ? state.readArticle.articles
        : state.tagArticles.articles;
    }
  );

  const isLoadingArticle = useSelector(
    (state: {
      readArticle: { isLoading: boolean };
      tagArticles: { isLoading: boolean };
    }) => {
      return page === "global-feed" || page === "your-feed"
        ? state.readArticle.isLoading
        : state.tagArticles.isLoading;
    }
  );

  return (
    <Table className={`${ArticleListStyle.homeList} `}>
      <tbody>
        {articles && !isLoadingArticle ? (
          articles.map((article) => (
            <tr key={article.slug}>
              <ArticleItem article={article} />
            </tr>
          ))
        ) : (
          <tr>
            <td>
              <Spinner className={ArticleListStyle.spinner} />
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default ArticlesList;
