import { createReducer } from 'typesafe-actions';
import produce from 'immer';
import { userActions } from '../actions/users';
import { User } from '../interfaces';

export interface UsersState {
  auth: {
    info?: User;
    loading: boolean;
    error: string;
    signInError: string;
  };
  userInfo: {
    data?: User;
    loading: boolean;
    error: string;
  };
  join: {
    complete: boolean;
    loading: boolean;
    error: string;
  };
  followers: {
    data?: User[];
    loading: boolean;
    error: string;
    hasMoreFollowers: boolean;
  };
  followings: {
    data?: User[];
    loading: boolean;
    error: string;
    hasMoreFollowings: boolean;
  };
}

export const initialState: UsersState = {
  auth: {
    info: undefined,
    loading: false,
    error: '',
    signInError: '',
  },
  userInfo: {
    data: undefined,
    loading: false,
    error: '',
  },
  join: {
    complete: false,
    loading: false,
    error: '',
  },
  followers: {
    data: undefined,
    loading: false,
    error: '',
    hasMoreFollowers: false,
  },
  followings: {
    data: undefined,
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
      draft.auth.signInError = action.payload;
      draft.auth.loading = false;
    })
  )
  .handleAction(userActions.signOut.request, (state) =>
    produce(state, (draft) => {
      draft.auth.error = '';
      draft.auth.loading = true;
    })
  )
  .handleAction(userActions.signOut.success, (state) =>
    produce(state, (draft) => {
      draft.auth.info = undefined;
      draft.auth.loading = false;
    })
  )
  .handleAction(userActions.signOut.failure, (state, action) =>
    produce(state, (draft) => {
      draft.auth.error = action.payload;
      draft.auth.loading = false;
    })
  )
  .handleAction(userActions.loadMyInfo.request, (state) =>
    produce(state, (draft) => {
      draft.auth.error = '';
      draft.auth.loading = true;
    })
  )
  .handleAction(userActions.loadMyInfo.success, (state, action) =>
    produce(state, (draft) => {
      draft.auth.info = action.payload;
      draft.auth.loading = false;
    })
  )
  .handleAction(userActions.loadMyInfo.failure, (state, action) =>
    produce(state, (draft) => {
      draft.auth.error = action.payload;
      draft.auth.loading = false;
    })
  )
  .handleAction(userActions.loadUserInfo.request, (state) =>
    produce(state, (draft) => {
      draft.userInfo.error = '';
      draft.userInfo.loading = true;
    })
  )
  .handleAction(userActions.loadUserInfo.success, (state, action) =>
    produce(state, (draft) => {
      draft.userInfo.data = action.payload;
      draft.userInfo.loading = false;
    })
  )
  .handleAction(userActions.loadUserInfo.failure, (state, action) =>
    produce(state, (draft) => {
      draft.userInfo.error = action.payload;
      draft.userInfo.loading = false;
    })
  );
