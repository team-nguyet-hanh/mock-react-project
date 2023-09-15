import React from "react";
import Nav from "react-bootstrap/Nav";
import { useDispatch } from "react-redux";
import {
  getFeedArticles,
  getGlobalAticles,
} from "../redux/article/articleAction";
import { useSelector } from "react-redux";

import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Pagination from "react-bootstrap/Pagination";
import { Link } from "react-router-dom";

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

const HomeNav: React.FC = () => {
  const dispatch = useDispatch();

  const articles = useSelector(
    (state: { articleData: { articles: Article[] } }) =>
      state.articleData.articles
  );

  const articlesLength = useSelector(
    (state: { articleData: { articles: Article[]; articlesCount: number } }) =>
      state.articleData.articlesCount
  );

  console.log(articlesLength);

  const active: number = 1;
  const items: JSX.Element[] = [];
  for (
    let number: number = 1;
    number <= Math.ceil(articlesLength / 10);
    number++
  ) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() =>
          dispatch(getGlobalAticles({ offset: (number - 1) * 10 }))
        }
      >
        {number}
      </Pagination.Item>
    );
  }

  function setArticles(selectedKey: string) {
    if (selectedKey === "your-feed") {
      dispatch(getFeedArticles());
    } else if (selectedKey === "global-feed") {
      dispatch(getGlobalAticles({ offset: 0 }));
    }
  }

  return (
    <>
      <Nav
        activeKey="/home"
        onSelect={(selectedKey) => setArticles(selectedKey || "")}
      >
        <Nav.Item>
          <Nav.Link eventKey="your-feed">Your Feed</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="global-feed">Global Feed</Nav.Link>
        </Nav.Item>
      </Nav>
      <Table>
        <tbody>
          {articles.map((article) => (
            <tr key={article.slug}>
              <td>
                <Image src={`${article.author.image}`} roundedCircle />
                <Link to={`@${article.author.username}`}>
                  <p>{article.author.username}</p>
                </Link>
                <p>{article.updatedAt.toLocaleString()}</p>
                <Link to={`article/${article.slug}`}>
                  <p>{article.title}</p>
                  <p>{article.body}</p>
                  <p>Read more...</p>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>{items}</Pagination>
    </>
  );
};

export default HomeNav;
