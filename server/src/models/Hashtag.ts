import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';
import { DbType } from './index';

class Hashtag extends Model {
  public readonly id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Hashtag.init({
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'hashtags',
  modelName: 'hashtags',
});

export const associateHashtag = (db: DbType) => {

};

export default Hashtag;