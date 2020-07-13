import * as passport from 'passport';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';
import User from '../models/User';

export default (): void => {
  passport.use(
    'local',
    new Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ where: { email } });

          if (!user) {
            return done(null, false, { message: '존재하지 않는 유저입니다.' });
          }

          const matched = await bcrypt.compare(password, user.password);

          if (matched) {
            return done(null, user);
          }

          return done(null, false, { message: '비밀번호를 다시 확인해주세요.' });
        } catch (e) {
          console.error(e);
          return done(e);
        }
      }
    )
  );
};
