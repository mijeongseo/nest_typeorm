import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import dotenvConfig from './dotenv.config';
import { DataSource } from 'typeorm';

dotenvConfig();

export type TDataSource = DataSourceOptions & SeederOptions;
export const dbData: TDataSource = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  name: 'default',
  type: 'mysql',
  port: 3306,
  entities: [],
  seeds: [],
  synchronize: false,
  logging: true,
};

export const dataSource = new DataSource(dbData);

export default dataSource;
