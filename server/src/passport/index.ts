import * as passport from 'passport';
import local from './local';
import User from '../models/User';
import Post from '../models/Post';

export default (): void => {
  // 로그인 시
  passport.serializeUser<User, number>((user, done) => {
    done(null, user.id);
  });

  // 매 라우터 접근 시
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await User.findByPk(id, {
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

      if (!user) {
        return done(new Error('로그인 되어있지 않습니다.'));
      }

      return done(null, user);
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });

  local();
};
