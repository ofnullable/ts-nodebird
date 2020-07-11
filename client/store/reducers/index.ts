import { combineReducers } from 'redux';
import user, { UsersState } from './users';
import post, { PostsState } from './posts';

export interface AppState {
  user: UsersState;
  post: PostsState;
}

export default combineReducers({ user, post });
