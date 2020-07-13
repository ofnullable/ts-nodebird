import axios from 'axios';
import { serverAddress } from '../../utils/global';

export default axios.create({
  baseURL: serverAddress,
  withCredentials: true,
});
