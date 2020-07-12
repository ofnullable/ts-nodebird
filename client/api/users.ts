import { AxiosPromise } from 'axios';
import api from './config';
import { JoinParams } from '../store/interfaces';

export const joinApi = (params: JoinParams): AxiosPromise => {
  return api.post('/users', params);
};
