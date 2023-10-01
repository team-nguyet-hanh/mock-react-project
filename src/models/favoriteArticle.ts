export interface FavoriteArticle {
  id?: number;
  slug: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  tagList: string[];
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
  body: string;
  favoritedBy: object[];
  favorited: string;
  favoritesCount: number;
}
