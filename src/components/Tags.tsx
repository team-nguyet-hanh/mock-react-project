import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getTags } from "../redux/tag/tagsHome/tagsHomeSlice";

import { getTagArticles } from "../redux/tag/tagArticles/tagArticlesSlice";
import { Button, Spinner, Stack } from "react-bootstrap";

import TagStyle from "./Tags.module.css";

interface TagsProps {
  setPage: (page: string) => void;
}

const Tags: React.FC<TagsProps> = ({ setPage }) => {
  const dispatch = useDispatch();

  const tags = useSelector(
    (state: { tagsHome: { tags: string[] } }) => state.tagsHome.tags
  );

  const isLoadingTags = useSelector(
    (state: { tagsHome: { isLoading: boolean } }) => state.tagsHome.isLoading
  );

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  return (
    <div className={`${TagStyle.list} align-self-start`}>
      {!isLoadingTags ? (
        <Stack direction="horizontal" className="flex-wrap">
          {tags?.map((tag, index) => (
            <Button
              variant="outline-primary"
              size="sm"
              key={index}
              className="rounded-pill m-1"
              onClick={() => {
                dispatch(getTagArticles({ offset: 0, tag: tag }));
                setPage(tag);
              }}
            >
              {tag}
            </Button>
          ))}
        </Stack>
      ) : (
        <Spinner className={TagStyle.spinner} />
      )}
    </div>
  );
};

export default Tags;
