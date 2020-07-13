export interface User {
  id: 1;
  email: string;
  nickname: string;
  createdAt: Date;
  updatedAt: Date;
  posts: unknown[];
  followings: unknown[];
  followers: unknown[];
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

export interface LoadUserParams {
  id?: number;
}

export interface Post {
  id: number;
}
