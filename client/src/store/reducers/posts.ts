import { createReducer } from 'typesafe-actions';
import produce from 'immer';
import { postActions } from '../actions/posts';
import { Post } from '../interfaces';

export interface PostsState {
  mainPosts: {
    data: Post[] | null;
    loading: boolean;
    error: string;
    hasMorePosts: boolean;
  };
  post: {
    data: Post | null;
    loading: boolean;
    error: string;
  };
  addPost: {
    complete: boolean;
    loading: boolean;
    error: string;
  };
  addComment: {
    complete: boolean;
    loading: boolean;
    error: string;
  };
  uploaded: {
    data: string[];
    loading: boolean;
    error: string;
  };
  removeImage: {
    complete: boolean;
    loading: boolean;
    error: string;
  };
}

export const initialState: PostsState = {
  mainPosts: {
    data: null,
    loading: false,
    error: '',
    hasMorePosts: false,
  },
  post: {
    data: null,
    loading: false,
    error: '',
  },
  addPost: {
    complete: false,
    loading: false,
    error: '',
  },
  addComment: {
    complete: false,
    loading: false,
    error: '',
  },
  uploaded: {
    data: [],
    loading: false,
    error: '',
  },
  removeImage: {
    complete: false,
    loading: false,
    error: '',
  },
};

export default createReducer(initialState)
  .handleAction(postActions.uploadImages.request, (state) =>
    produce(state, (draft) => {
      draft.uploaded.loading = true;
      draft.uploaded.error = '';
    })
  )
  .handleAction(postActions.uploadImages.success, (state, action) =>
    produce(state, (draft) => {
      draft.uploaded.loading = false;
      draft.uploaded.data = action.payload;
    })
  )
  .handleAction(postActions.uploadImages.failure, (state, action) =>
    produce(state, (draft) => {
      draft.uploaded.loading = false;
      draft.uploaded.error = action.payload;
    })
  )
  .handleAction(postActions.removeImage.request, (state) =>
    produce(state, (draft) => {
      draft.removeImage.loading = true;
    })
  )
  .handleAction(postActions.removeImage.success, (state, action) =>
    produce(state, (draft) => {
      draft.removeImage.complete = true;
      draft.removeImage.loading = false;
      const idx = draft.uploaded.data.findIndex((path) => path === action.payload.path);
      if (idx && draft.uploaded.data) {
        draft.uploaded.data.splice(idx, 1);
      }
    })
  )
  .handleAction(postActions.removeImage.failure, (state, action) =>
    produce(state, (draft) => {
      draft.removeImage.loading = false;
      draft.removeImage.error = action.payload;
    })
  )
  .handleAction(postActions.addPost.request, (state) =>
    produce(state, (draft) => {
      draft.addPost.complete = false;
      draft.addPost.loading = true;
      draft.addPost.error = '';
    })
  )
  .handleAction(postActions.addPost.success, (state, action) =>
    produce(state, (draft) => {
      if (draft.mainPosts.data) draft.mainPosts.data.unshift(action.payload);
      else draft.mainPosts.data = [action.payload];
      draft.addPost.complete = true;
      draft.addPost.loading = false;
    })
  )
  .handleAction(postActions.addPost.failure, (state, action) =>
    produce(state, (draft) => {
      draft.addPost.loading = false;
      draft.addPost.error = action.payload;
    })
  )
  .handleAction(
    [postActions.loadMainPosts.request, postActions.loadHashtagPosts.request, postActions.loadUserPosts.request],
    (state, action) =>
      produce(state, (draft) => {
        draft.mainPosts.data = action.payload.lastId ? draft.mainPosts.data : [];
        draft.mainPosts.hasMorePosts = action.payload.lastId ? true : draft.mainPosts.hasMorePosts;
        draft.mainPosts.loading = true;
        draft.mainPosts.error = '';
      })
  )
  .handleAction(
    [postActions.loadMainPosts.success, postActions.loadHashtagPosts.success, postActions.loadUserPosts.success],
    (state, action) =>
      produce(state, (draft) => {
        draft.mainPosts.loading = false;
        if (draft.mainPosts.data) draft.mainPosts.data.push(...action.payload);
        else draft.mainPosts.data = action.payload;
      })
  )
  .handleAction(
    [postActions.loadMainPosts.failure, postActions.loadHashtagPosts.failure, postActions.loadUserPosts.failure],
    (state, action) =>
      produce(state, (draft) => {
        draft.mainPosts.loading = false;
        draft.mainPosts.error = action.payload;
      })
  );
