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
export const loadHashtagPostsApi = ({ lastId, limit = 10, tag }: HashtagPostsParams): AxiosPromise => {
  return api.get(`/hashtag/${encodeURIComponent(tag)}?lastId=${lastId}&limit=${limit}`);
};
