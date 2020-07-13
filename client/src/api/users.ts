import { AxiosPromise } from 'axios';
import api from './config';
import { JoinParams, SignInParams } from '../store/interfaces';

export const signInApi = (params: SignInParams): AxiosPromise => {
  return api.post('/auth/sign-in', params);
};

export const joinApi = (params: JoinParams): AxiosPromise => {
  return api.post('/users', params);
};

export const loadUserApi = (userId?: number): AxiosPromise => {
  return api.get(userId ? `/users/${userId}` : '/users');
};
