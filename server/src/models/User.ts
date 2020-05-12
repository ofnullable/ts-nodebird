import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from './index';

class User extends Model {
  public readonly id!: number;
  public username!: string;
  public password!: string;
  public nickname!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
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
  },
}, {
  sequelize,
  modelName: 'users',
  tableName: 'users',
  charset: 'utf8',
  collate: 'c',
});

export const associate = (db: dbType) => { };

export default User;