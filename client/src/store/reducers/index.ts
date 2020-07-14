import { AnyAction, combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import user, { initialState as usersState, UsersState } from './users';
import post, { initialState as postsState, PostsState } from './posts';

export interface AppState {
  user: UsersState;
  post: PostsState;
}

const rootReducer = (state: AppState = { user: usersState, post: postsState }, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE: {
      console.log('HYDRATED state:', action.payload);
      return action.payload;
    }

    default: {
      const combinedReducer = combineReducers({ user, post });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
