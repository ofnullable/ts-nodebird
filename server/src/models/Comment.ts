import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';

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

export default Comment;