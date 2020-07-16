import * as express from 'express';
import * as multer from 'multer';
import * as uuid from 'uuid';
import * as fs from 'fs';
import { extname, resolve } from 'path';
import { isLogin } from '../middlewars';
import Post from '../models/Post';
import Hashtag from '../models/Hashtag';
import Image from '../models/Image';
import User from '../models/User';
import Comment from '../models/Comment';

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'public/uploads/');
    },
    filename(req, file, cb) {
      cb(null, uuid.v4() + extname(file.originalname));
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

const router = express.Router();

router.post('/', isLogin, upload.none(), async (req, res, next) => {
  try {
    const hashtag: string[] = req.body.content.match(/#[^\s]+/g);

    const newPost = await Post.create({
      content: req.body.content,
      userId: req.user!.id,
    });

    if (hashtag) {
      const promises = hashtag.map((tag) =>
        Hashtag.findOrCreate({
          where: { name: tag.slice(1).toLowerCase() },
        })
      );

      const result = await Promise.all(promises);
      await newPost.addHashtags(result.map((r) => r[0]));
    }

    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const promises: Promise<Image>[] = req.body.image.map((image: string) => Image.create({ src: image }));
        const images = await Promise.all(promises);
        await newPost.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        await newPost.addImage(image);
      }
    }

    const fullPost = await Post.findOne({
      where: { id: newPost.id },
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
    });

    res.json(fullPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/images', isLogin, upload.array('image'), (req, res) => {
  console.log(req.files);

  res.json((req.files as Express.Multer.File[]).map((v) => `public/${v.filename}`));
});

router.delete('/image/:filename', isLogin, (req, res, next) => {
  const uploadedPath = resolve(__dirname, '../../public/uploads');
  fs.unlink(`${uploadedPath}/${req.params.filename}`, (err) => {
    if (err) {
      next(err);
      return;
    }
    res.status(202).json({ path: `public/${req.params.filename}` });
  });
});

router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
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
      ],
    });

    res.json(post);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/:id', isLogin, async (req, res, next) => {
  try {
    const postId = req.params.id;

    const post = await Post.findOne({
      where: { id: postId },
      include: [
        {
          model: User,
          where: { id: req.user!.id },
        },
      ],
    });

    if (!post) {
      res.status(404).send('존재하지 않는 트윗입니다.');
      return;
    }

    await Post.destroy({ where: { id: postId } });
    res.send(postId);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/:id/comments', async (req, res, next) => {
  try {
    const lastId = Number(req.query.lastId);

    const comments = await Comment.findAll({
      where: {
        postId: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
      ],
      order: [['createdAt', 'ASC']],
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/:id/comment', isLogin, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
    });

    if (!post) {
      res.status(404).send('존재하지 않는 트윗입니다.');
      return;
    }

    const newComment = await Comment.create({
      postId: post.id,
      userId: req.user!.id,
      content: req.body.content,
    });

    const comment = await Comment.findOne({
      where: {
        id: newComment.id,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
      ],
    });

    res.json(comment);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/:id/like', isLogin, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
    });

    if (!post) {
      res.status(404).send('존재하지 않는 트윗입니다.');
      return;
    }

    await post.addLiker(req.user!.id);
    res.json({ userId: req.user!.id });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/:id/like', isLogin, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
    });

    if (!post) {
      res.status(404).send('존재하지 않는 트윗입니다.');
      return;
    }

    await post.removeLiker(req.user!.id);
    res.json({ userId: req.user!.id });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/:id/retweet', isLogin, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Post,
          as: 'retweet',
        },
      ],
    });

    if (!post) {
      res.status(404).send('존재하지 않는 트윗입니다.');
      return;
    }
    if (req.user!.id === post.userId || (post.retweet && post.retweet.userId === req.user!.id)) {
      res.status(400).send('자신의 게시글은 리트윗할 수 없습니다.');
      return;
    }

    const retweetTargetId = post.retweetId || post.id;

    const exPost = await Post.findOne({
      where: {
        userId: req.user!.id,
        retweetId: retweetTargetId,
      },
    });

    if (exPost) {
      res.status(400).send('이미 리트윗한 트윗입니다.');
      return;
    }

    const retweet = await Post.create({
      userId: req.user!.id,
      retweetId: retweetTargetId,
      content: 'retweet',
    });

    const retweetWithPrevPost = await Post.findOne({
      where: { id: retweet.id },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: Post,
          as: 'retweet',
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
            {
              model: Image,
            },
          ],
        },
      ],
    });

    res.json(retweetWithPrevPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

export default router;
