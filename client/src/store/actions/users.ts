import { createAction, createAsyncAction } from 'typesafe-actions';
import { JoinParams, SignInParams, User } from '../interfaces';
import { asyncActionCreator } from '../../utils/redux';

export const users = {
  JOIN: asyncActionCreator('users/JOIN'),
  SIGN_IN: asyncActionCreator('users/SIGN_IN'),
  LOAD_MY_INFO: asyncActionCreator('users/LOAD_MY_INFO'),
  LOAD_USER_INFO: asyncActionCreator('users/LOAD_USER_INFO'),
  SIGN_OUT: asyncActionCreator('users/SIGN_OUT'),
  FOLLOW: asyncActionCreator('users/FOLLOW'),
  UNFOLLOW: asyncActionCreator('users/UNFOLLOW'),
  LOAD_FOLLOWERS: asyncActionCreator('users/LOAD_FOLLOWERS'),
  LOAD_FOLLOWINGS: asyncActionCreator('users/LOAD_FOLLOWINGS'),
  REMOVE_FOLLOWER: asyncActionCreator('users/REMOVE_FOLLOWER'),
  EDIT_NICKNAME: asyncActionCreator('users/EDIT_NICKNAME'),
  ADD_POST: 'ADD_POST',
  REMOVE_POST: 'REMOVE_POST',
};

export const userActions = {
  signIn: createAsyncAction(users.SIGN_IN.REQUEST, users.SIGN_IN.SUCCESS, users.SIGN_IN.FAILURE)<
    SignInParams,
    User,
    string
  >(),

  signOut: createAsyncAction(users.SIGN_OUT.REQUEST, users.SIGN_OUT.SUCCESS, users.SIGN_OUT.FAILURE)<
    void,
    void,
    string
  >(),

  join: createAsyncAction(users.JOIN.REQUEST, users.JOIN.SUCCESS, users.JOIN.FAILURE)<JoinParams, User, string>(),

  loadMyInfo: createAsyncAction(users.LOAD_MY_INFO.REQUEST, users.LOAD_MY_INFO.SUCCESS, users.LOAD_MY_INFO.FAILURE)<
    void,
    User,
    string
  >(),

  loadUserInfo: createAsyncAction(
    users.LOAD_USER_INFO.REQUEST,
    users.LOAD_USER_INFO.SUCCESS,
    users.LOAD_USER_INFO.FAILURE
  )<number, User, string>(),

  follow: createAsyncAction(users.FOLLOW.REQUEST, users.FOLLOW.SUCCESS, users.FOLLOW.FAILURE)<number, void, string>(),

  unfollow: createAsyncAction(users.UNFOLLOW.REQUEST, users.UNFOLLOW.SUCCESS, users.UNFOLLOW.FAILURE)<
    number,
    void,
    string
  >(),

  loadFollowers: createAsyncAction(
    users.LOAD_FOLLOWERS.REQUEST,
    users.LOAD_FOLLOWERS.SUCCESS,
    users.LOAD_FOLLOWERS.FAILURE
  )<{ userId?: number; limit?: number; offset?: number }, void, string>(),

  loadFollowings: createAsyncAction(
    users.LOAD_FOLLOWINGS.REQUEST,
    users.LOAD_FOLLOWINGS.SUCCESS,
    users.LOAD_FOLLOWINGS.FAILURE
  )<{ userId?: number; limit?: number; offset?: number }, void, string>(),

  removeFollower: createAsyncAction(
    users.REMOVE_FOLLOWER.REQUEST,
    users.REMOVE_FOLLOWER.SUCCESS,
    users.REMOVE_FOLLOWER.FAILURE
  )<number, void, string>(),

  editNickname: createAsyncAction(
    users.EDIT_NICKNAME.REQUEST,
    users.EDIT_NICKNAME.SUCCESS,
    users.EDIT_NICKNAME.FAILURE
  )<string, void, string>(),

  addPost: createAction(users.ADD_POST)(),
  removePost: createAction(users.REMOVE_POST)<number>(),
};
