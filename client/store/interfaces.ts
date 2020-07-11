export interface User {
  id: number;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface SignUpParams {
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
