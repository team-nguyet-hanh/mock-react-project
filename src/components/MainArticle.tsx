import { useDispatch } from "react-redux";

import React, { useEffect } from "react";

import { getCurrentUser } from "../redux/currentUser/currentUserSlice";

import { Article } from "../models/article";

import MainArticleStyle from "./MainArticle.module.css";
import { Button } from "react-bootstrap";

type ArticleProps = {
  article: Article;
};

const MainArticle: React.FC<ArticleProps> = ({ article }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <article>
      <p className={MainArticleStyle.title}>{article?.title}</p>
      <p>{`${article?.body}`}</p>
      {article?.tagList.map((tag) => (
        <Button
          className="rounded-pill m-1"
          variant="outline-primary"
          size="sm"
          key={tag}
        >
          {tag}
        </Button>
      ))}
    </article>
  );
};

export default MainArticle;
