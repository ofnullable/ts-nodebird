import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  Model,
} from 'sequelize';
import { sequelize } from './sequelize';
import { DbType } from './index';
import Hashtag from './Hashtag';
import Image from './Image';
import User from './User';

class Post extends Model {
  public readonly id!: number;
  public content!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public userId!: number;
  public retweetId?: number;
  public readonly retweet?: Post;

  public addImage!: HasManyAddAssociationMixin<Image, number>;
  public addImages!: HasManyAddAssociationsMixin<Image, number>;
  public addHashtags!: BelongsToManyAddAssociationsMixin<Hashtag, number>;
  public addLiker!: BelongsToManyAddAssociationMixin<User, number>;
  public removeLiker!: BelongsToManyRemoveAssociationMixin<User, number>;
}

Post.init({
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'posts',
  tableName: 'posts',
});

export const associatePost = (db: DbType) => {
  db.Post.belongsTo(db.User);
  db.Post.hasMany(db.Comment);
  db.Post.hasMany((db.Image));
  db.Post.belongsTo(db.Post, { as: 'retweet' });
  db.Post.belongsToMany(db.Hashtag, { through: 'post_hashtags' });
  db.Post.belongsToMany(db.User, { through: 'likes', as: 'likers' });
};

export default Post;