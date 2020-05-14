import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';

class Image extends Model {
  public readonly id!: number;
  public src!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Image.init({
  src: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'images',
  modelName: 'images',
});

export default Image;