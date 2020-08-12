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
  retweet: {
    complete: boolean;
    loading: boolean;
    error: string;
  };
  remove: {
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
  retweet: {
    complete: false,
    loading: false,
    error: '',
  },
  remove: {
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
      const idx = (draft.uploaded.data || []).findIndex((path) => path === action.payload.path);
      if (idx >= 0 && draft.uploaded.data) {
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
      draft.uploaded.data = null;
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
  )
  .handleAction(postActions.retweet.request, (state) =>
    produce(state, (draft) => {
      draft.retweet.complete = false;
      draft.retweet.loading = true;
      draft.retweet.error = '';
    })
  )
  .handleAction(postActions.retweet.success, (state, action) =>
    produce(state, (draft) => {
      draft.retweet.complete = true;
      draft.mainPosts.data?.unshift(action.payload);
      draft.retweet.loading = false;
    })
  )
  .handleAction(postActions.retweet.failure, (state, action) =>
    produce(state, (draft) => {
      draft.retweet.error = action.payload;
      draft.retweet.loading = false;
    })
  )
  .handleAction(postActions.removePost.request, (state) =>
    produce(state, (draft) => {
      draft.remove.complete = false;
      draft.remove.loading = true;
      draft.remove.error = '';
    })
  )
  .handleAction(postActions.removePost.success, (state, action) =>
    produce(state, (draft) => {
      draft.remove.complete = true;
      const index = draft.mainPosts.data?.findIndex((post) => post.id === action.payload);
      if (index != null && index >= 0) {
        draft.mainPosts.data?.splice(index, 1);
      }
      draft.remove.loading = false;
    })
  )
  .handleAction(postActions.removePost.failure, (state, action) =>
    produce(state, (draft) => {
      draft.remove.error = action.payload;
      draft.remove.loading = false;
    })
  )
  .handleAction(postActions.likePost.success, (state, action) =>
    produce(state, (draft) => {
      const targetIndex = (draft.mainPosts.data || []).findIndex((post) => post.id === action.payload.postId);
      const targetPost = draft.mainPosts.data?.[targetIndex];
      if (targetPost) {
        targetPost.likers.unshift({ id: action.payload.userId });
      }
    })
  )
  .handleAction(postActions.unlikePost.success, (state, action) =>
    produce(state, (draft) => {
      const targetIndex = (draft.mainPosts.data || []).findIndex((post) => post.id === action.payload.postId);
      const targetPost = draft.mainPosts.data?.[targetIndex];
      if (targetPost) {
        const likedIndex = (targetPost.likers || []).findIndex((liker) => liker.id === action.payload.userId);
        if (likedIndex >= 0) {
          targetPost.likers.splice(likedIndex, 1);
        }
      }
    })
  );
