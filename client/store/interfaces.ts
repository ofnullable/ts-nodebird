export interface User {
  id: number;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface JoinParams {
  email: string;
  name: string;
  password: string;
}

export interface LoadUserParams {
  id: number;
}

export interface Post {
  id: number;
}
