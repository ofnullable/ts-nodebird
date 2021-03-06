import { createAsyncAction } from 'typesafe-actions';
import { Post } from '../interfaces';
import { asyncActionCreator } from '../../utils/redux';

export const posts = {
  LOAD_MAIN_POSTS: asyncActionCreator('posts/LOAD_MAIN_POSTS'),
  LOAD_HASHTAG_POSTS: asyncActionCreator('posts/LOAD_HASHTAG_POSTS'),
  LOAD_USER_POSTS: asyncActionCreator('posts/LOAD_USER_POSTS'),
  LOAD_POST: asyncActionCreator('posts/LOAD_POST'),
  UPLOAD_IMAGES: asyncActionCreator('posts/UPLOAD_IMAGES'),
  ADD_POST: asyncActionCreator('posts/ADD_POST'),
  LIKE_POST: asyncActionCreator('posts/LIKE_POST'),
  UNLIKE_POST: asyncActionCreator('posts/UNLIKE_POST'),
  LOAD_COMMENTS: asyncActionCreator('posts/LOAD_COMMENTS'),
  ADD_COMMENT: asyncActionCreator('posts/ADD_COMMENT'),
  RETWEET: asyncActionCreator('posts/RETWEET'),
  REMOVE_POST: asyncActionCreator('posts/REMOVE_POST'),
  REMOVE_IMAGE: asyncActionCreator('posts/REMOVE_IMAGE'),
};

export const postActions = {
  loadMainPosts: createAsyncAction(
    posts.LOAD_MAIN_POSTS.REQUEST,
    posts.LOAD_MAIN_POSTS.SUCCESS,
    posts.LOAD_MAIN_POSTS.FAILURE
  )<{ lastId?: number }, Post[], string>(),

  loadHashtagPosts: createAsyncAction(
    posts.LOAD_HASHTAG_POSTS.REQUEST,
    posts.LOAD_HASHTAG_POSTS.SUCCESS,
    posts.LOAD_HASHTAG_POSTS.FAILURE
  )<{ lastId?: number; tag: string }, Post[], string>(),

  loadUserPosts: createAsyncAction(
    posts.LOAD_USER_POSTS.REQUEST,
    posts.LOAD_USER_POSTS.SUCCESS,
    posts.LOAD_USER_POSTS.FAILURE
  )<{ lastId?: number; userId?: number }, Post[], string>(),

  loadPost: createAsyncAction(posts.LOAD_POST.REQUEST, posts.LOAD_POST.SUCCESS, posts.LOAD_POST.FAILURE)<
    void,
    void,
    string
  >(),

  uploadImages: createAsyncAction(
    posts.UPLOAD_IMAGES.REQUEST,
    posts.UPLOAD_IMAGES.SUCCESS,
    posts.UPLOAD_IMAGES.FAILURE
  )<FormData, string[], string>(),

  addPost: createAsyncAction(posts.ADD_POST.REQUEST, posts.ADD_POST.SUCCESS, posts.ADD_POST.FAILURE)<
    FormData,
    Post,
    string
  >(),

  likePost: createAsyncAction(posts.LIKE_POST.REQUEST, posts.LIKE_POST.SUCCESS, posts.LIKE_POST.FAILURE)<
    number,
    { postId: number; userId: number },
    string
  >(),

  unlikePost: createAsyncAction(posts.UNLIKE_POST.REQUEST, posts.UNLIKE_POST.SUCCESS, posts.UNLIKE_POST.FAILURE)<
    number,
    { postId: number; userId: number },
    string
  >(),

  loadComment: createAsyncAction(posts.LOAD_COMMENTS.REQUEST, posts.LOAD_COMMENTS.SUCCESS, posts.LOAD_COMMENTS.FAILURE)<
    number,
    void,
    string
  >(),

  addComment: createAsyncAction(posts.ADD_COMMENT.REQUEST, posts.ADD_COMMENT.SUCCESS, posts.ADD_COMMENT.FAILURE)<
    void,
    void,
    string
  >(),

  retweet: createAsyncAction(posts.RETWEET.REQUEST, posts.RETWEET.SUCCESS, posts.RETWEET.FAILURE)<
    number,
    Post,
    string
  >(),

  removePost: createAsyncAction(posts.REMOVE_POST.REQUEST, posts.REMOVE_POST.SUCCESS, posts.REMOVE_POST.FAILURE)<
    number,
    number,
    string
  >(),

  removeImage: createAsyncAction(posts.REMOVE_IMAGE.REQUEST, posts.REMOVE_IMAGE.SUCCESS, posts.REMOVE_IMAGE.FAILURE)<
    string,
    { path: string },
    string
  >(),
};
