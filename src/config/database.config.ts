import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import dotenvConfig from './dotenv.config';
import { DataSource } from 'typeorm';
import { User } from '@entities/user.entity';
// import path from 'path';

dotenvConfig();

export type TDataSource = DataSourceOptions & SeederOptions;
export const databaseOptions: TDataSource = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  name: 'default',
  type: 'mysql',
  port: 3306,
  entities: [User],
  seeds: [],
  synchronize: false,
  logging: true,
};

const dataSource = new DataSource(databaseOptions);

export default dataSource;
