import {
  DataTypes,
  Model,
  Association,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
} from 'sequelize';
import { sequelize } from './sequelize';
import { DbType } from './index';
import Hashtag from './Hashtag';
import Image from './Image';
import User from './User';
import Comment from './Comment';

class Post extends Model {
  public readonly id!: number;

  public content!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public userId!: number;

  public retweetId?: number;

  public readonly retweet?: Post;

  public readonly user?: User;

  public readonly likers?: User[];

  public readonly images?: Image[];

  public readonly comments?: Comment[];

  public addImage!: HasManyAddAssociationMixin<Image, number>;

  public addImages!: HasManyAddAssociationsMixin<Image, number>;

  public addHashtags!: BelongsToManyAddAssociationsMixin<Hashtag, number>;

  public addLiker!: BelongsToManyAddAssociationMixin<User, number>;

  public removeLiker!: BelongsToManyRemoveAssociationMixin<User, number>;

  public static associations: {
    Retweet: Association<Post, Post>;
  };
}

Post.init(
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'posts',
    tableName: 'posts',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  }
);

export const associatePost = (db: DbType) => {
  db.Post.belongsTo(db.User);
  db.Post.hasMany(db.Comment);
  db.Post.hasMany(db.Image);
  db.Post.belongsTo(db.Post, { as: 'retweet' });
  db.Post.belongsToMany(db.Hashtag, { through: 'post_hashtags' });
  db.Post.belongsToMany(db.User, { through: 'likes', as: 'likers' });
};

export default Post;
