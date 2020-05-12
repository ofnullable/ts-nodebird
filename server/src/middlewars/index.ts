import { NextFunction, Request, Response } from 'express';

export const isLogin = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('로그인이 필요합니다.');
};

export const isNotLogin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.status(403).send('로그인한 사용자는 접근할 수 없습니다.');
};