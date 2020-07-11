import { createReducer } from 'typesafe-actions';
import produce from 'immer';
import { posts, PostsAction } from '../actions/posts';
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
}

const initialState: PostsState = {
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
};

export default createReducer<PostsState, PostsAction>(initialState, {
  [posts.LOAD_MAIN_POSTS.REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.mainPosts = {
        data: null,
        loading: true,
        error: '',
        hasMorePosts: false,
      };
    }),
});
