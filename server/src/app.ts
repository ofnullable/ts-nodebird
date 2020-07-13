import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as expressSession from 'express-session';
import * as hpp from 'hpp';
import * as helmet from 'helmet';
import * as passport from 'passport';

import passportConfig from './passport';
import { sequelize } from './models';

import authRouter from './routes/auth';
import userRouter from './routes/user';
import postRouter from './routes/post';
import postsRouter from './routes/posts';
import hashtagRouter from './routes/hashtag';

const prod = process.env.NODE_ENV === 'production';
const app = express();

passportConfig();

sequelize
  .sync({ force: !prod })
  .then(() => {
    console.log('Success sync database');
  })
  .catch((e: Error) => {
    console.error(e);
  });

if (prod) {
  app.use(hpp());
  app.use(helmet());
  app.use(morgan('combined'));
  app.use(
    cors({
      origin: /nodebird\.com$/,
      credentials: true,
    })
  );
} else {
  app.use(morgan('dev'));
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
}

app.use('/public', express.static('public/uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET!,
    cookie: {
      httpOnly: true,
      secure: false,
      domain: prod ? '.host.com' : undefined,
    },
    name: 'nodebird',
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/hashtag', hashtagRouter);

app.get('/', (req, res) => {
  res.send('Welcome TS-NODEBIRD Server!');
});

export default app;
