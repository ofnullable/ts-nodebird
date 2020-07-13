import * as express from 'express';
import * as passport from 'passport';
import { isLogin, isNotLogin } from '../middlewars';
import User from '../models/User';
import Post from '../models/Post';

const router = express.Router();

router.post('/sign-in', isNotLogin, (req, res, next) => {
  passport.authenticate('local', (err: Error, user: User, info: { message: string }) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info && info.message) {
      console.error(info.message);
      return res.status(400).send(info.message);
    }
    return req.login(user, async (error: Error) => {
      try {
        if (error) {
          return next(error);
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

router.post('/sign-out', isLogin, (req, res) => {
  req.logout();
  req.session!.destroy(() => {
    res.sendStatus(204);
  });
});

export default router;
