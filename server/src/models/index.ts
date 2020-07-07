import User, { associateUser } from './User';
import Post, { associatePost } from './Post';
import Comment, { associateComment } from './Comment';
import Hashtag, { associateHashTag } from './Hashtag';
import Image, { associateImage } from './Image';

export * from './sequelize';

const db = {
  User,
  Post,
  Comment,
  Hashtag,
  Image,
};

export type DbType = typeof db;

associateUser(db);
associatePost(db);
associateComment(db);
associateHashTag(db);
associateImage(db);
