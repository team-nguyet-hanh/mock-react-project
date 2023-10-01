import { Link, useParams } from "react-router-dom";
import { deleteComment } from "../redux/comment/deleteComment/deleteCommentSlice";
import { Stack, Image, Button } from "react-bootstrap";
import { ArticleComment } from "../models/comment";
import { getCurrentUser } from "../redux/currentUser/currentUserSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentStyle from "./ArticleComment.module.css";
import { UserType } from "../models/user";

type ArticleCommentProps = {
  filteredComment: ArticleComment[];

  filteredNewComment: ArticleComment[];
};

const ArticleCommentList: React.FC<ArticleCommentProps> = ({
  filteredComment,

  filteredNewComment,
}) => {
  const { articleId } = useParams<{ articleId: string }>();

  const dispatch = useDispatch();

  const currentUser = useSelector(
    (state: { currentUser: { currentAccount: UserType } }) => {
      return state.currentUser.currentAccount;
    }
  );

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const handleDate = (comment: ArticleComment) => {
    const date = new Date(comment.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return date;
  };

  return (
    <div>
      {filteredComment?.map((comment) => (
        <Stack
          key={comment.id}
          className={`${CommentStyle.comment} mx-auto border-light-subtle`}
        >
          <Stack direction="horizontal" className="align-items-center">
            <Link to={`/${comment.author?.username}`}>
              <Image
                src={comment.author.image}
                className={CommentStyle.image}
                roundedCircle
              />
            </Link>

            <Link
              to={`/${comment.author?.username}`}
              className={CommentStyle.username}
            >
              <p>{comment.author?.username}</p>
            </Link>

            <p className={CommentStyle.time}>{handleDate(comment)}</p>

            {currentUser.username === comment.author.username && (
              <Button
                className="ms-auto"
                variant="outline-danger"
                onClick={() => {
                  dispatch(deleteComment({ slug: articleId!, id: comment.id }));
                }}
              >
                <i className="fa-solid fa-ban"></i>
              </Button>
            )}
          </Stack>
          <p className="mb-0">{comment.body}</p>
        </Stack>
      ))}

      {filteredNewComment?.map((comment) => (
        <Stack
          key={comment.id}
          className={`${CommentStyle.comment} mx-auto border-light-subtle`}
        >
          <Stack direction="horizontal" className="align-items-center">
            <Link to={`/${comment.author?.username}`}>
              <Image
                src={comment.author.image}
                className={CommentStyle.image}
                roundedCircle
              />
            </Link>
            <Link
              to={`/${comment.author?.username}`}
              className={CommentStyle.username}
            >
              <p>{comment.author?.username}</p>
            </Link>
            <p className={CommentStyle.time}>{handleDate(comment)}</p>
            {currentUser.username === comment.author.username ? (
              <Button
                className="ms-auto"
                variant="outline-danger"
                onClick={() => {
                  dispatch(deleteComment({ slug: articleId!, id: comment.id }));
                }}
              >
                <i className="fa-solid fa-ban"></i>
              </Button>
            ) : (
              <></>
            )}
          </Stack>
          <p className="mb-0">{comment.body}</p>
        </Stack>
      ))}
    </div>
  );
};

export default ArticleCommentList;
