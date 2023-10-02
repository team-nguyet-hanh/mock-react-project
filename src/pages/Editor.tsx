import React, { useEffect, useState } from "react";
import formStyle from "./SignIn.module.css";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Article, ArticlePost } from "../models/article";
import Button from "react-bootstrap/Button";
import { createArticle } from "../redux/article/createArticle/createArticleSlice";
import { useParams } from "react-router-dom";
import { getAnArticle } from "../redux/article/anArticle/anArticleSlice";
import { getCurrentUser } from "../redux/currentUser/currentUserSlice";
import { updateAnArticle } from "../redux/article/updateArticle/updateArticleSlice";
import { Col, Stack } from "react-bootstrap";

const Editor: React.FC = () => {
  const ParseTextarea = ({
    value = "",
    onChange,
    errorMessage,
  }: {
    value: string;
    onChange: (value: string) => void;
    errorMessage: string;
  }) => {
    const [text, setText] = useState<string>(value);

    useEffect(() => {
      // Reset the textarea value when there is an error
      if (errorMessage) {
        setText(value);
      }
    }, [errorMessage, value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setText(value);
      onChange(value);
    };

    return (
      <textarea
        id="body"
        className={formStyle.field}
        placeholder="Content..."
        onChange={handleChange}
        value={text}
      />
    );
  };

  const dispatch = useDispatch();

  const { slug } = useParams<{ slug: string }>();

  const article = useSelector(
    (state: { anArticle: { article: Article } }) => state.anArticle.article
  );

  useEffect(() => {
    dispatch(getCurrentUser());

    if (slug) {
      dispatch(getAnArticle(slug));
    }
  }, [dispatch, slug]);

  const { control, handleSubmit, setValue } = useForm<ArticlePost>();

  const [tagList, setTagList] = useState<string[]>(
    slug ? article?.tagList : []
  );

  const [tagInputValue, setTagInputValue] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const trimmedValue = tagInputValue.trim();
      if (trimmedValue && !tagList?.some((tag) => tag === trimmedValue)) {
        setTagList([...tagList, trimmedValue]);
        setTagInputValue("");
      }
    }
  };

  const errorCreateArticleMessage = useSelector(
    (state: { createArticle: { failMessage: string } }) =>
      state.createArticle.failMessage
  );

  const errorUpdateArticleMessage = useSelector(
    (state: { updateArticle: { failMessage: string } }) =>
      state.updateArticle.failMessage
  );

  useEffect(() => {
    if (slug) {
      setValue("title", article?.title || "");
      setValue("description", article?.description || "");
      setValue("body", article?.body || "");
      setValue("tagList", []);
      setTagList([]);

      setErrorMessage(errorUpdateArticleMessage);
    } else {
      setValue("title", "");
      setValue("description", "");
      setValue("body", "");
      setValue("tagList", []);
      setErrorMessage(errorCreateArticleMessage);
    }
  }, [
    article,
    setValue,
    slug,
    errorUpdateArticleMessage,
    errorCreateArticleMessage,
  ]);

  const onSubmit = async (data: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  }) => {
    data.tagList = tagList;
    if (data.title && data.description && data.body) {
      setErrorMessage("");
      try {
        if (!slug) {
          await dispatch(
            createArticle({
              title: data.title,
              description: data.description,
              body: data.body,
              tagList: data.tagList,
            })
          );
          setErrorMessage(errorCreateArticleMessage);
        } else {
          await dispatch(
            updateAnArticle({
              article: {
                title: data.title,
                description: data.description,
                body: data.body,
                tagList: data.tagList,
              },
              slug: slug,
            })
          );
          setErrorMessage(errorUpdateArticleMessage);
        }
      } catch (error) {
        setErrorMessage("Title must be unique.");
      }
    } else {
      setErrorMessage("Title, body and content are required.");
    }
  };

  return (
    <div className={formStyle.container}>
      <Col lg="3" xs="8" sm="8" md="8">
        <h3 className="text-center pb-3">
          {slug ? "Edit the article" : "Create New Articles"}
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <Controller
              name="title"
              control={control}
              defaultValue={slug ? article?.title : ""}
              render={({ field }) => (
                <input
                  className={formStyle.field}
                  maxLength={50}
                  placeholder="Title"
                  type="text"
                  id="title"
                  {...field}
                  onKeyPress={(e) => handleKeyPress(e)}
                />
              )}
            />
          </Stack>

          <Stack>
            <Controller
              name="description"
              control={control}
              defaultValue={slug ? article?.description : ""}
              render={({ field }) => (
                <input
                  className={formStyle.field}
                  type="text"
                  placeholder="Description"
                  id="description"
                  {...field}
                  onKeyPress={(e) => handleKeyPress(e)}
                />
              )}
            />
          </Stack>

          <Stack>
            <Controller
              name="body"
              control={control}
              defaultValue={slug ? article?.body : ""}
              render={({ field }) => (
                <ParseTextarea
                  value={field.value || ""}
                  onChange={(value) => field.onChange(value)}
                  errorMessage={""}
                />
              )}
            />
          </Stack>

          <Stack>
            <Controller
              name="tagList"
              control={control}
              render={({ field }) => (
                <input
                  className={formStyle.field}
                  type="text"
                  placeholder="Enter tags"
                  id="tagList"
                  {...field}
                  value={tagInputValue}
                  onChange={(e) => setTagInputValue(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e)}
                />
              )}
            />
          </Stack>

          {tagList?.map((tag, index) => (
            <Button
              variant="outline-primary"
              size="sm"
              className="rounded-pill m-1"
              key={tag}
              onClick={() => {
                const updatedTagList = tagList.filter((_, i) => i !== index);

                setTagList(updatedTagList);
              }}
            >
              {tag} <i className="fa-solid fa-x"></i>
            </Button>
          ))}
          {errorMessage && <p className="text-danger">{errorMessage}</p>}

          <Stack>
            <Button type="submit" className={formStyle.button}>
              Submit
            </Button>
          </Stack>
        </form>
      </Col>
    </div>
  );
};

export default Editor;
