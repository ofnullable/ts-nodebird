import * as path from 'path';
import * as express from 'express';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import * as Bluebird from 'bluebird';

import { isLogin } from '../middlewars';
import Post from '../models/Post';
import Hashtag from '../models/Hashtag';
import Image from '../models/Image';
import User from '../models/User';

AWS.config.update({
  region: 'ap-northeast-2',
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'ts-nodebird',
    key(req, file, cb) {
      cb(null, `original/${+new Date()}${path.basename(file.originalname)}`);
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
      UserId: req.user!.id,
    });

    if (hashtag) {
      const promises = hashtag.map((tag) => Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase() },
      }));

      const result = await Promise.all(promises);
      await newPost.addHashtags(result.map((r) => r[0]));
    }

    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const promises: Bluebird<Image>[] = req.body.image.map((image: string) => Image.create({ src: image }));
        const images = await Promise.all(promises);
        await newPost.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        await newPost.addImage(image);
      }
    }

    const fullPost = await Post.findOne({
      where: { id: newPost.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: Image,
      }, {
        model: User,
        as: 'likers',
        attributes: ['id'],
      }],
    });

    return res.json(fullPost);
  } catch (e) {
    console.error(e);
  }
});

export default router;