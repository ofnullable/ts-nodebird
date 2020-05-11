import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import * as expressSession from 'express-session';
import * as hpp from 'hpp';
import * as helmet from 'helmet';
import * as passport from 'passport';
import { sequelize } from './models';

dotenv.config();

const prod = process.env.NODE_ENV === 'production';
const app = express();

sequelize.sync({ force: !prod })
  .then(() => {
    console.log('Success sync database');
  })
  .catch((e) => {
    console.error(e);
  });

if (prod) {
  app.use(hpp());
  app.use(helmet);
  app.use(morgan('combined'));
  app.use(cors({
    origin: true,
    credentials: true,
  }));
}

app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET!,
  cookie: {
    httpOnly: true,
    secure: false,
    domain: prod ? '.host.com' : undefined,
  },
  name: 'nodebird',
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Welcome TS-NODEBIRD Server!');
});

const port = Number(process.env.PORT) || 3030;
app.listen(port, () => {
  console.log(
    `Server running on port: ${port}!`,
  );
});
