import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Article } from "../models/article";
import { getAnArticle } from "../redux/article/anArticle/anArticleSlice";
import { getArticleComment } from "../redux/comment/readComment/readCommentSlice";
import { ArticleComment } from "../models/comment";
import { Controller, useForm } from "react-hook-form";
import { createComment } from "../redux/comment/createComment/createCommentSlice";
import { getCurrentUser } from "../redux/currentUser/currentUserSlice";
import ArticleCommentList from "../components/ArticleComment";
import MainArticle from "../components/MainArticle";
import ArticleAuthor from "../components/ArticleAuthor";
import { Spinner, Stack } from "react-bootstrap";
import ArticleStyle from "./ArticleId.module.css";
import { UserType } from "../models/user";

const ArticlePage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const dispatch = useDispatch();
  const article = useSelector(
    (state: { anArticle: { article: Article } }) => state.anArticle.article
  );

  const comments = useSelector(
    (state: {
      articleComments: { comments: { comments: ArticleComment[] } };
    }) => {
      return state.articleComments.comments;
    }
  );

  const currentUser = useSelector(
    (state: { currentUser: { currentAccount: UserType } }) => {
      return state.currentUser.currentAccount;
    }
  );

  const failArticle = useSelector(
    (state: { anArticle: { isFail: boolean } }) => state.anArticle.isFail
  );

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAnArticle(articleId!));
    dispatch(getArticleComment(articleId!));
    dispatch(getCurrentUser());
    failArticle && navigate("/");
  }, [dispatch, articleId, failArticle, navigate]);

  const { control, handleSubmit, reset } = useForm<{
    body: string;
  }>();

  const newComment = useSelector(
    (state: { createComment: { createdComment: ArticleComment[] } }) =>
      state.createComment.createdComment
  );

  const deletedCommentId = useSelector(
    (state: { deleteComment: { deletedCommentId: number[] } }) =>
      state.deleteComment.deletedCommentId
  );

  const filteredComment = comments?.comments?.filter(
    (comment) => !deletedCommentId.includes(comment.id)
  );

  const filteredNewComment = newComment?.filter(
    (comment) => !deletedCommentId.includes(comment.id)
  );

  const onSubmit = async (data: { body: string }) => {
    const { body } = data;

    if (body?.trim().length > 0) {
      dispatch(
        createComment({
          comment: { comment: { body: body } },
          slug: articleId!,
        })
      );
      reset({
        body: "",
      });
    } else {
      console.error("provide a the body");
    }
  };

  const isLoadingArticle = useSelector(
    (state: { anArticle: { isLoading: Article } }) => state.anArticle.isLoading
  );

  const isLoadingUser = useSelector(
    (state: { currentUser: { isLoading: boolean } }) => {
      return state.currentUser.isLoading;
    }
  );
  return (
    <section>
      <Stack className={ArticleStyle.article}>
        {!isLoadingArticle ? (
          <>
            <MainArticle article={article} />
            <ArticleAuthor article={article} />
            <ArticleCommentList
              filteredComment={filteredComment}
              filteredNewComment={filteredNewComment}
            />
            {!isLoadingUser ? (
              currentUser?.username ? (
                <form
                  className={`${ArticleStyle.form} mt-3 mx-auto`}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Stack direction="horizontal" gap={3}>
                    <Controller
                      name="body"
                      control={control}
                      render={({ field }) => (
                        <input
                          placeholder="Comment..."
                          type="text"
                          id="body"
                          className={ArticleStyle.inputComment}
                          {...field}
                        />
                      )}
                    />
                    <Button type="submit">Submit</Button>
                  </Stack>
                </form>
              ) : (
                <p>Login or Register to comment</p>
              )
            ) : (
              <Spinner className="mx-auto mt-3" />
            )}
          </>
        ) : (
          <Spinner className={ArticleStyle.spinner} />
        )}
      </Stack>
    </section>
  );
};

export default ArticlePage;
