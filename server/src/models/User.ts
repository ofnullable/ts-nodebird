import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  DataTypes,
  HasManyGetAssociationsMixin,
  Model,
} from 'sequelize';
import { DbType } from './index';
import { sequelize } from './sequelize';
import Post from './Post';

class User extends Model {
  public readonly id!: number;

  public username!: string;

  public password!: string;

  public nickname!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly posts?: Post[];

  public readonly followers?: User[];

  public readonly followings?: User[];

  public getPosts!: HasManyGetAssociationsMixin<Post>;

  public addFollowings!: BelongsToManyAddAssociationMixin<User, number>;

  public getFollowers!: BelongsToManyGetAssociationsMixin<User>;

  public getFollowings!: BelongsToManyGetAssociationsMixin<User>;

  public removeFollower!: BelongsToManyRemoveAssociationMixin<User, number>;

  public removeFollowing!: BelongsToManyRemoveAssociationMixin<User, number>;
}

User.init(
  {
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'users',
    tableName: 'users',
  }
);

export const associateUser = (db: DbType) => {
  db.User.hasMany(db.Post, { as: 'posts' });
  db.User.hasMany(db.Comment);
  db.User.belongsToMany(db.Post, { through: 'likes', as: 'liked' });
  db.User.belongsToMany(db.User, {
    through: 'follow',
    as: 'followers',
    foreignKey: 'followingId',
  });
  db.User.belongsToMany(db.User, {
    through: 'follow',
    as: 'followings',
    foreignKey: 'followerId',
  });
};

export default User;
