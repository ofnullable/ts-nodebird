import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';
import { DbType } from './index';

class Hashtag extends Model {
  public readonly id!: number;

  public name!: string;
}

Hashtag.init(
  {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'hashtags',
    modelName: 'hashtags',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  }
);

export const associateHashTag = (db: DbType) => {
  db.Hashtag.belongsToMany(db.Post, { through: 'post_hashtags' });
};

export default Hashtag;
