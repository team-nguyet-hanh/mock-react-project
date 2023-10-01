export type CommentCreate = { body: string };

export type ArticleComment = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
};

export type CommentPost = {
  body: string;
};

export type CommentDataState = {
  comments: ArticleComment[];
};
