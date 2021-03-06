import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as Sequelize from 'sequelize';
import { isLogin } from '../middlewars';
import User from '../models/User';
import Post from '../models/Post';
import Image from '../models/Image';

const router = express.Router();

router.get('/', isLogin, (req, res) => {
  const user = req.user!.toJSON() as User;
  delete user.password;
  return res.json(user);
});

router.post('/', async (req, res, next) => {
  const { email, password, nickname } = req.body;

  try {
    const exUser = await User.findOne({
      where: {
        email,
      },
    });
    if (exUser) {
      return res.status(409).send('이미 사용중인 사용자 이름입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 15);
    const newUser = await User.create({
      email,
      nickname,
      password: hashedPassword,
    });

    return res.status(201).json(newUser);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: Number(req.params.id) },
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
      return res.status(404).send('존재하지 않는 회원입니다.');
    }

    return res.json(user.toJSON());
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get('/:id/followings', isLogin, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: Number(req.params.id) || (req.user && req.user.id) || 0 },
    });

    if (!user) {
      return res.status(404).send('존재하지 않는 회원입니다.');
    }

    const followings = await user.getFollowings({
      attributes: ['id', 'nickname'],
      limit: Number(req.query.limit),
      offset: Number(req.query.offset),
    });

    return res.json(followings);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get('/:id/followers', isLogin, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: Number(req.params.id) || (req.user && req.user.id) || 0 },
    });

    if (!user) {
      return res.status(404).send('존재하지 않는 회원입니다.');
    }

    const followers = await user.getFollowers({
      attributes: ['id', 'nickname'],
      limit: Number(req.query.limit),
      offset: Number(req.query.offset),
    });

    return res.json(followers);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.delete('/:id/follower', isLogin, async (req, res, next) => {
  try {
    const me = await User.findOne({
      where: { id: req.user!.id },
    });

    await me!.removeFollower(Number(req.params.id));

    return res.send(req.params.id);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.post('/:id/follow', isLogin, async (req, res, next) => {
  try {
    const me = await User.findOne({
      where: { id: req.user!.id },
    });

    await me!.addFollowings(Number(req.params.id));

    return res.send(req.params.id);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.delete('/:id/follow', isLogin, async (req, res, next) => {
  try {
    const me = await User.findOne({
      where: { id: req.user!.id },
    });

    await me!.removeFollowing(Number(req.params.id));

    return res.send(req.params.id);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get('/:id/posts', async (req, res, next) => {
  try {
    const lastId = Number(req.query.lastId);

    const posts = await Post.findAll({
      where: {
        userId: Number(req.params.id) || (req.user && req.user.id) || 0,
        retweetId: null,
        ...(lastId
          ? {
              id: {
                [Sequelize.Op.lt]: Number(req.query.lastId),
              },
            }
          : {}),
      },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: Image,
        },
        {
          model: User,
          as: 'likers',
          attributes: ['id'],
        },
      ],
      limit: Number(req.query.limit),
    });

    return res.json(posts);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.patch('/nickname', isLogin, async (req, res, next) => {
  try {
    await User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.user!.id },
      }
    );

    return res.send(req.body.nickname);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

export default router;
