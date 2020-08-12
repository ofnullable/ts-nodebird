import { AxiosPromise } from 'axios';
import api from './config';

export const uploadImageApi = (data: FormData): AxiosPromise => {
  return api.post('/post/images', data);
};

export const removeImageApi = (filename: string): AxiosPromise => {
  return api.delete(`/post/image/${filename}`);
};

export const addPostApi = (data: FormData): AxiosPromise => {
  return api.post('/post', data);
};

export const loadMainPostsApi = (lastId = 0, limit = 10): AxiosPromise => {
  return api.get(`/posts?lastId=${lastId}&limit=${limit}`);
};

interface HashtagPostsParams {
  lastId?: number;
  limit?: number;
  tag: string;
}
export const loadHashtagPostsApi = ({ lastId = 0, limit = 10, tag }: HashtagPostsParams): AxiosPromise => {
  return api.get(`/hashtag/${encodeURIComponent(tag)}?lastId=${lastId}&limit=${limit}`);
};

interface UserPostsParams {
  userId?: number;
  lastId?: number;
  limit?: number;
}
export const loadUserPostsApi = ({ userId = 0, lastId = 0, limit = 10 }: UserPostsParams): AxiosPromise => {
  return api.get(`/users/${userId}/posts?lastId=${lastId}&limit=${limit}`);
};

export const likePostApi = (postId: number): AxiosPromise => {
  return api.post(`/post/${postId}/like`);
};

export const unlikePostApi = (postId: number): AxiosPromise => {
  return api.delete(`/post/${postId}/like`);
};

export const removePostApi = (postId: number): AxiosPromise => {
  return api.delete(`/post/${postId}`);
};

export const retweetApi = (postId: number): AxiosPromise => {
  return api.post(`/post/${postId}/retweet`);
};
