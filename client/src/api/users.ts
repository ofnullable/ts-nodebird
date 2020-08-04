import { AxiosPromise } from 'axios';
import api from './config';
import { FollowParams, JoinParams, SignInParams } from '../store/interfaces';

export const signInApi = (params: SignInParams): AxiosPromise => {
  return api.post('/auth/sign-in', params);
};

export const joinApi = (params: JoinParams): AxiosPromise => {
  return api.post('/users', params);
};

export const loadUserApi = (userId?: number): AxiosPromise => {
  return api.get(userId ? `/users/${userId}` : '/users');
};

export const loadFollowersApi = ({ userId, limit = 3, offset = 0 }: FollowParams): AxiosPromise => {
  return api.get(`/users/${userId || 0}/followers?offset=${offset}&limit=${limit}`);
};

export const loadFollowingsApi = ({ userId, limit = 3, offset = 0 }: FollowParams): AxiosPromise => {
  return api.get(`/users/${userId || 0}/followings?offset=${offset}&limit=${limit}`);
};
