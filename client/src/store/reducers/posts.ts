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
    data: string[] | null;
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
    data: null,
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
  .handleAction(postActions.uploadImages.request, (state) => ({
    ...state,
    uploaded: {
      ...state.uploaded,
      loading: true,
      error: '',
    },
  }))
  .handleAction(postActions.uploadImages.success, (state, action) => ({
    ...state,
    uploaded: {
      ...state.uploaded,
      data: action.payload,
      loading: false,
    },
  }))
  .handleAction(postActions.uploadImages.failure, (state, action) => ({
    ...state,
    uploaded: {
      ...state.uploaded,
      error: action.payload,
      loading: false,
    },
  }))
  .handleAction(postActions.removeImage.request, (state) =>
    produce(state, (draft) => {
      draft.removeImage.loading = true;
      return draft;
    })
  )
  .handleAction(postActions.removeImage.success, (state, action) =>
    produce(state, (draft) => {
      draft.removeImage.complete = true;
      draft.removeImage.loading = false;
      const idx = draft.uploaded.data?.findIndex((path) => path === action.payload.path);
      if (idx && draft.uploaded.data) {
        draft.uploaded.data.splice(idx, 1);
      }
      return draft;
    })
  )
  .handleAction(postActions.removeImage.failure, (state, action) =>
    produce(state, (draft) => {
      draft.removeImage.loading = false;
      draft.removeImage.error = action.payload;
      return draft;
    })
  )
  .handleAction(postActions.addPost.request, (state) =>
    produce(state, (draft) => {
      draft.addPost.complete = false;
      draft.addPost.loading = true;
      draft.addPost.error = '';
      return draft;
    })
  )
  .handleAction(postActions.addPost.success, (state, action) =>
    produce(state, (draft) => {
      if (draft.mainPosts.data) draft.mainPosts.data.unshift(action.payload);
      else draft.mainPosts.data = [action.payload];
      draft.addPost.complete = true;
      draft.addPost.loading = false;
      return draft;
    })
  )
  .handleAction(postActions.addPost.failure, (state, action) =>
    produce(state, (draft) => {
      draft.addPost.loading = false;
      draft.addPost.error = action.payload;
      return draft;
    })
  );
