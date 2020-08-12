import { createReducer } from 'typesafe-actions';
import produce from 'immer';
import { userActions } from '../actions/users';
import { FollowUser, User } from '../interfaces';

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
    data?: FollowUser[];
    loading: boolean;
    error: string;
    hasMoreFollowers: boolean;
  };
  followings: {
    data?: FollowUser[];
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
  )
  .handleAction(userActions.loadFollowers.request, (state) =>
    produce(state, (draft) => {
      draft.followers.error = '';
      draft.followers.loading = true;
    })
  )
  .handleAction(userActions.loadFollowers.success, (state, action) =>
    produce(state, (draft) => {
      draft.followers.data = action.payload;
      draft.followers.loading = false;
    })
  )
  .handleAction(userActions.loadFollowers.failure, (state, action) =>
    produce(state, (draft) => {
      draft.followers.error = action.payload;
      draft.followers.loading = false;
    })
  )
  .handleAction(userActions.loadFollowings.request, (state) =>
    produce(state, (draft) => {
      draft.followings.error = '';
      draft.followings.loading = true;
    })
  )
  .handleAction(userActions.loadFollowings.success, (state, action) =>
    produce(state, (draft) => {
      draft.followings.data = action.payload;
      draft.followings.loading = false;
    })
  )
  .handleAction(userActions.loadFollowings.failure, (state, action) =>
    produce(state, (draft) => {
      draft.followings.error = action.payload;
      draft.followings.loading = false;
    })
  )
  .handleAction(userActions.follow.request, (state) =>
    produce(state, (draft) => {
      draft.followings.error = '';
      draft.followings.loading = true;
    })
  )
  .handleAction(userActions.follow.success, (state, action) =>
    produce(state, (draft) => {
      draft.auth.info?.followings.unshift({ id: action.payload });
      draft.followings.data
        ? draft.followings.data.unshift({ id: action.payload })
        : (draft.followings.data = [{ id: action.payload }]);
      draft.followings.loading = false;
    })
  )
  .handleAction(userActions.follow.failure, (state, action) =>
    produce(state, (draft) => {
      draft.followings.error = action.payload;
      draft.followings.loading = false;
    })
  )
  .handleAction(userActions.unfollow.request, (state) =>
    produce(state, (draft) => {
      draft.followings.error = '';
      draft.followings.loading = true;
    })
  )
  .handleAction(userActions.unfollow.success, (state, action) =>
    produce(state, (draft) => {
      const infoIndex = draft.auth.info?.followings.findIndex((following) => following.id === action.payload);
      if (infoIndex != null && infoIndex >= 0) {
        draft.auth.info?.followings.splice(infoIndex, 1);
      }
      const followingsIndex = draft.followings.data?.findIndex((following) => following.id === action.payload);
      if (followingsIndex != null && followingsIndex >= 0) {
        draft.followings.data?.splice(followingsIndex, 1);
      }
      draft.followings.loading = false;
    })
  )
  .handleAction(userActions.unfollow.failure, (state, action) =>
    produce(state, (draft) => {
      draft.followings.error = action.payload;
      draft.followings.loading = false;
    })
  )
  .handleAction(userActions.removeFollower.request, (state) =>
    produce(state, (draft) => {
      draft.followers.error = '';
      draft.followers.loading = true;
    })
  )
  .handleAction(userActions.removeFollower.success, (state, action) =>
    produce(state, (draft) => {
      const infoIndex = draft.auth.info?.followers.findIndex((follower) => follower.id === action.payload);
      if (infoIndex != null && infoIndex >= 0) {
        draft.auth.info?.followers.splice(infoIndex, 1);
      }
      const followersIndex = draft.followers.data?.findIndex((follower) => follower.id === action.payload);
      if (followersIndex != null && followersIndex >= 0) {
        draft.followers.data?.splice(followersIndex, 1);
      }
      draft.followers.loading = false;
    })
  )
  .handleAction(userActions.removeFollower.failure, (state, action) =>
    produce(state, (draft) => {
      draft.followers.error = action.payload;
      draft.followers.loading = false;
    })
  )
  .handleAction(userActions.editNickname.request, (state) =>
    produce(state, (draft) => {
      draft.auth.loading = true;
      draft.auth.error = '';
    })
  )
  .handleAction(userActions.editNickname.success, (state, action) =>
    produce(state, (draft) => {
      if (draft.auth.info) draft.auth.info.nickname = action.payload;
      draft.auth.loading = false;
    })
  )
  .handleAction(userActions.editNickname.failure, (state, action) =>
    produce(state, (draft) => {
      draft.auth.error = action.payload;
      draft.auth.loading = false;
    })
  );
