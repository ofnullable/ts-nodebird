import { Sequelize } from 'sequelize';
import { dbConfig } from '../config';

const { database, username, password } = dbConfig;

const sequelize = new Sequelize(database, username, password, dbConfig);

export { sequelize };
export default sequelize;
