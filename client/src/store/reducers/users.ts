import { createReducer } from 'typesafe-actions';
import produce from 'immer';
import { userActions } from '../actions/users';
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

export const initialState: UsersState = {
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

export default createReducer(initialState)
  .handleAction(userActions.join.request, (state) =>
    produce(state, (draft) => {
      draft.join = {
        complete: false,
        loading: true,
        error: '',
      };
    })
  )
  .handleAction(userActions.join.success, (state) =>
    produce(state, (draft) => {
      draft.join.complete = true;
      draft.join.loading = false;
    })
  )
  .handleAction(userActions.join.failure, (state, action) =>
    produce(state, (draft) => {
      draft.join.error = action.payload;
      draft.join.loading = false;
    })
  )
  .handleAction(userActions.signIn.request, (state) =>
    produce(state, (draft) => {
      draft.auth.error = '';
      draft.auth.loading = true;
    })
  )
  .handleAction(userActions.signIn.success, (state, action) =>
    produce(state, (draft) => {
      draft.auth.info = action.payload;
      draft.auth.loading = false;
    })
  )
  .handleAction(userActions.signIn.failure, (state, action) =>
    produce(state, (draft) => {
      draft.auth.error = action.payload;
      draft.auth.loading = false;
    })
  )
  .handleAction(userActions.loadUser.request, (state) =>
    produce(state, (draft) => {
      draft.auth.error = '';
      draft.auth.loading = true;
    })
  )
  .handleAction(userActions.loadUser.success, (state, action) =>
    produce(state, (draft) => {
      draft.auth.info = action.payload;
      draft.auth.loading = false;
    })
  )
  .handleAction(userActions.loadUser.failure, (state) =>
    produce(state, (draft) => {
      draft.auth.loading = false;
    })
  );
