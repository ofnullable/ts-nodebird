import { AnyAction, combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import user, { initialState as usersState, UsersState } from './users';
import post, { initialState as postsState, PostsState } from './posts';

export interface AppState {
  user: UsersState;
  post: PostsState;
}

const combinedReducer = combineReducers({ user, post });

const rootReducer = (state: AppState = { user: usersState, post: postsState }, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE: {
      console.log('HYDRATE payload:', action.payload);
      return {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      };
    }

    default:
      return combinedReducer(state, action);
  }
};

export default rootReducer;
