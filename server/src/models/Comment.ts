import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';
import { DbType } from './index';

class Comment extends Model {
  public readonly id!: number;
  public content!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init({
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'comments',
  modelName: 'comments',
});

export const associateComment = (db: DbType) => {

};

export default Comment;