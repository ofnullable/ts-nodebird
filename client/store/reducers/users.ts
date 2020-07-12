import { createReducer } from 'typesafe-actions';
import produce from 'immer';
import { userActions, UsersAction } from '../actions/users';
import { User } from '../interfaces';

export interface UsersState {
  auth: {
    info: User | null;
    loading: boolean;
    error: string;
  };
  join: {
    complete: boolean;
    loading: boolean;
    error: string;
  };
  followers: {
    data: User[] | null;
    loading: boolean;
    error: string;
    hasMoreFollowers: boolean;
  };
  followings: {
    data: User[] | null;
    loading: boolean;
    error: string;
    hasMoreFollowings: boolean;
  };
}

const initialState: UsersState = {
  auth: {
    info: null,
    loading: false,
    error: '',
  },
  join: {
    complete: false,
    loading: false,
    error: '',
  },
  followers: {
    data: null,
    loading: false,
    error: '',
    hasMoreFollowers: false,
  },
  followings: {
    data: null,
    loading: false,
    error: '',
    hasMoreFollowings: false,
  },
};

export default createReducer<UsersState, UsersAction>(initialState)
  .handleAction(userActions.join.request, (state) =>
    produce(state, (draft) => {
      draft.join = {
        complete: false,
        loading: true,
        error: '',
      };
      return draft;
    })
  )
  .handleAction(userActions.join.success, (state, action) =>
    produce(state, (draft) => {
      draft.auth.info = action.payload;
      draft.auth.loading = false;
      draft.join.complete = true;
      draft.join.loading = false;
      return draft;
    })
  )
  .handleAction(userActions.signIn.request, (state, action) => produce(state, (draft) => {}));
