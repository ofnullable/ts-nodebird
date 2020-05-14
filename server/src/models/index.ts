import User, { associateUser } from './User';
import Post, { associatePost } from './Post';
import Comment from './Comment';
import Hashtag from './Hashtag';
import Image from './Image';

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