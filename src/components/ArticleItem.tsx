import React from "react";

import Image from "react-bootstrap/Image";

import { Link } from "react-router-dom";

import { Article } from "../models/article";
import { LikeBtn } from "./LikeBtn";
import { Button, Stack } from "react-bootstrap";

import ArticleItemStyle from "./ArticleItem.module.css";

const ArticleItem: React.FC<{ article: Article }> = ({ article }) => {
  const handleDate = (article: Article) => {
    const date = new Date(article.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return date;
  };

  return (
    <td className={`${ArticleItemStyle.article} align-items-center p-4`}>
      <Stack direction="horizontal">
        <Link
          to={`/${article.author.username}`}
          className={ArticleItemStyle.authorName}
        >
          <Image
            className={ArticleItemStyle.image}
            src={`${article.author.image}`}
            roundedCircle
          />
        </Link>
        <Stack className={`${ArticleItemStyle.header}  justify-content-center`}>
          <Link
            to={`/${article.author.username}`}
            className={ArticleItemStyle.authorName}
          >
            <p>{article.author.username}</p>
          </Link>
          <p className={ArticleItemStyle.time}>{handleDate(article)}</p>
        </Stack>
        <LikeBtn className="ms-auto" article={article} isListItem={true} />
      </Stack>

      <Link to={`/article/${article.slug}`} className="text-decoration-none">
        <p className={ArticleItemStyle.title}>
          {article.title.slice(0, 50)} {article.title.length > 51 ? "..." : ""}
        </p>

        <p className={ArticleItemStyle.description}>
          {article.description.slice(0, 100)}{" "}
          {article.description.length > 101 ? "..." : ""}
        </p>

        {article.tagList.map((tag: string) => (
          <Button
            className="rounded-pill m-1"
            variant="outline-primary"
            size="sm"
            key={tag}
          >
            {tag}
          </Button>
        ))}
      </Link>
    </td>
  );
};

export default ArticleItem;
