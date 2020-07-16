import { AxiosPromise } from 'axios';
import api from './config';
import { Post } from '../store/interfaces';

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
