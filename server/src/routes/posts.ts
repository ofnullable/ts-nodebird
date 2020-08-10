import * as express from 'express';
import * as Sequelize from 'sequelize';

import Post from '../models/Post';
import User from '../models/User';
import Image from '../models/Image';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const lastId = Number(req.query.lastId);
    const limit = Number(req.query.limit);

    const posts = await Post.findAll({
      where: lastId
        ? {
            id: {
              [Sequelize.Op.lt]: Number(req.query.lastId),
            },
          }
        : {},
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
        },
        {
          model: Image,
        },
        {
          model: User,
          as: 'likers',
          attributes: ['id'],
        },
        {
          model: Post,
          as: 'retweet',
          include: [
            {
              model: User,
              attributes: {
                exclude: ['password'],
              },
            },
            {
              model: Image,
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
      limit,
    });

    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

export default router;
