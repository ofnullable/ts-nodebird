import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';

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

export default Hashtag;