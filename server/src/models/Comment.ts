import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';
import { DbType } from './index';

class Comment extends Model {
  public readonly id!: number;

  public content!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

Comment.init(
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'comments',
    modelName: 'comments',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  }
);

export const associateComment = (db: DbType) => {
  db.Comment.belongsTo(db.User);
  db.Comment.belongsTo(db.Post);
};

export default Comment;
