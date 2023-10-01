import { Stack, Image, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { getCurrentUser } from "../redux/currentUser/currentUserSlice";
import { Article } from "../models/article";
import { deleteArticle } from "../redux/article/deleteArticle/deleteArticleSlice";
import { LikeBtn } from "./LikeBtn";
import { FollowBtn } from "./FollowBtn";
import ArticleAuthorStyle from "./ArticleAuthor.module.css";
import { UserType } from "../models/user";

type ArticleAuthorProps = {
  article: Article;
};

const ArticleAuthor: React.FC<ArticleAuthorProps> = ({ article }) => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(
    (state: { currentUser: { currentAccount: UserType } }) => {
      return state.currentUser.currentAccount;
    }
  );

  const isLoading = useSelector(
    (state: { currentUser: { isLoading: boolean } }) => {
      return state.currentUser.isLoading;
    }
  );

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const handleDate = (article: Article) => {
    const date = new Date(article?.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return date;
  };

  return (
    <Stack direction="horizontal">
      <Link to={`/${article?.author?.username}`}>
        <Image
          src={`${article?.author.image ? article.author?.image : ""}`}
          roundedCircle
          className={ArticleAuthorStyle.image}
        />
      </Link>
      <Stack className={` justify-content-center ${ArticleAuthorStyle.info}`}>
        <Link
          to={`/${article?.author?.username}`}
          className={` text-decoration-none`}
        >
          <p className={`${ArticleAuthorStyle.username} m-0`}>
            {article?.author?.username}
          </p>
        </Link>
        <p className={`${ArticleAuthorStyle.date} m-0`}>
          {handleDate(article)}
        </p>
      </Stack>

      {!isLoading ? (
        currentUser.username !== article?.author.username ? (
          <Stack
            direction="horizontal"
            gap={4}
            className={`${ArticleAuthorStyle.buttons} my-5`}
          >
            <FollowBtn currentProfile={article?.author} />
            <LikeBtn article={article} isListItem={false} />
          </Stack>
        ) : (
          <Stack direction="horizontal" gap={4} className="my-5">
            <Button
              variant="outline-secondary"
              onClick={() => navigate(`/editor/${article.slug}`)}
            >
              Edit Article
            </Button>

            <Button
              variant="outline-danger"
              onClick={() => {
                dispatch(deleteArticle(articleId!));
              }}
            >
              Delete Article
            </Button>
          </Stack>
        )
      ) : (
        <Spinner />
      )}
    </Stack>
  );
};

export default ArticleAuthor;
