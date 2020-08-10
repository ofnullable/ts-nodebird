export interface User {
  id: 1;
  email: string;
  nickname: string;
  createdAt: Date;
  updatedAt: Date;
  posts: unknown[];
  followers?: User[];
  followings?: User[];
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface JoinParams {
  email: string;
  nickname: string;
  password: string;
}

export interface Post {
  id: number;
  images?: { src: string }[];
  content: string;
  user: User;
  likers?: User[];
  retweetId?: number;
  retweet?: Post;
  createdAt: Date;
}

export interface FollowParams {
  userId?: number;
  limit?: number;
  offset?: number;
}
