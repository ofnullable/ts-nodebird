import { AxiosPromise } from 'axios';
import api from './config';
import { FollowParams, JoinParams, SignInParams } from '../store/interfaces';

export const signInApi = (params: SignInParams): AxiosPromise => {
  return api.post('/auth/sign-in', params);
};

export const signOutApi = (): AxiosPromise => {
  return api.post('/auth/sign-out', {});
};

export const joinApi = (params: JoinParams): AxiosPromise => {
  return api.post('/users', params);
};

export const loadMyInfoApi = (): AxiosPromise => {
  return api.get('/users');
};

export const loadUserInfoApi = (userId: number): AxiosPromise => {
  return api.get(`/users/${userId}`);
};

export const loadFollowersApi = ({ userId, limit = 3, offset = 0 }: FollowParams): AxiosPromise => {
  return api.get(`/users/${userId || 0}/followers?offset=${offset}&limit=${limit}`);
};

export const loadFollowingsApi = ({ userId, limit = 3, offset = 0 }: FollowParams): AxiosPromise => {
  return api.get(`/users/${userId || 0}/followings?offset=${offset}&limit=${limit}`);
};
