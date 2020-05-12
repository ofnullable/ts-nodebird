import { DataTypes, Model } from 'sequelize';
import { DbType } from './index';
import { sequelize } from './sequelize';

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
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'users',
  tableName: 'users',
});

export const associateUser = (db: DbType) => {
};

export default User;