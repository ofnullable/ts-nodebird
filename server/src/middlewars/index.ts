import { RequestHandler } from 'express';

export const isLogin: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('로그인이 필요합니다.');
};

export const isNotLogin: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.status(403).send('로그인한 사용자는 접근할 수 없습니다.');
};
