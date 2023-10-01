import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import HomeNav from "../components/HomeNav";

import Pagination from "../components/Pagination";

import ArticlesList from "../components/ArticlesList";

import HomeStyle from "./Home.module.css";

import {
  getFeedArticle,
  getGlobalArticle,
} from "../redux/article/readArticle/readArticleSlice";

import Tags from "../components/Tags";

import { getTagArticles } from "../redux/tag/tagArticles/tagArticlesSlice";
import { Stack } from "react-bootstrap";

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const access_token = localStorage.getItem("access_token");

  const [page, setPage] = useState(access_token ? "your-feed" : "global-feed");

  function setArticles(selectedKey: string) {
    if (selectedKey === "your-feed") {
      setPage(selectedKey);

      dispatch(getFeedArticle(0));
    } else if (selectedKey === "global-feed") {
      setPage(selectedKey);

      dispatch(getGlobalArticle(0));
    } else {
      setPage(selectedKey);

      dispatch(getTagArticles({ offset: 0, tag: selectedKey }));
    }
  }

  useEffect(() => {
    access_token ? dispatch(getFeedArticle(0)) : dispatch(getGlobalArticle(0));
  }, [access_token, dispatch]);

  return (
    <>
      <Stack direction="horizontal" className={HomeStyle.home}>
        <Stack>
          <HomeNav
            setArticles={setArticles}
            tag={page}
            access_token={access_token || ""}
          />
          <ArticlesList page={page} />
          <Pagination page={page} />
        </Stack>

        <Tags setPage={setPage} />
      </Stack>
    </>
  );
};

export default Home;
