import * as express from 'express';
import { isLogin, isNotLogin } from '../middlewars';
import * as passport from 'passport';
import User from '../models/User';
import Post from '../models/Post';

const router = express.Router();

router.post('/signin', isNotLogin, (req, res, next) => {
  passport.authenticate('local', (err: Error, user: User, info: { message: string }) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info.message) {
      console.error(info.message);
      return res.status(400).send(info.message);
    }
    return req.login(user, async (err: Error) => {
      try {
        if (err) {
          return next(err);
        }

        const result = await User.findOne({
          where: { id: user.id },
          include: [
            {
              model: Post,
              as: 'posts',
              attributes: ['id'],
            },
            {
              model: User,
              as: 'followings',
              attributes: ['id'],
            },
            {
              model: User,
              as: 'followers',
              attributes: ['id'],
            },
          ],
          attributes: {
            exclude: ['password'],
          },
        });

        return res.json(result);
      } catch (e) {
        console.error(e);
        return next(e);
      }
    });
  })(req, res, next);
});

router.post('/signout', isLogin, (req, res) => {
  req.logout();
  req.session!.destroy(() => {
    res.sendStatus(204);
  });
});
