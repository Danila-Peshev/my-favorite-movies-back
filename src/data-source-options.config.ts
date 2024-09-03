import { config } from 'dotenv';
import { join } from 'path';
import { DataSourceOptions } from 'typeorm';
config();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.{ts, js}'],
  migrations: [join(__dirname, 'migrations', '*.{ts, js}')],
};

export default dataSourceOptions;
