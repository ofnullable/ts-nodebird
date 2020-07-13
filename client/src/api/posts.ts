import { AxiosPromise } from 'axios';
import api from './config';
import { Post } from '../store/interfaces';

export const uploadImageApi = (data: FormData): AxiosPromise => {
  return api.post('/post/images', data);
};

export const removeImageApi = (filename: string): AxiosPromise => {
  return api.delete(`/post/image/${filename}`);
};

export const addPostApi = (data: Post): AxiosPromise => {
  return api.post('/post', data);
};
