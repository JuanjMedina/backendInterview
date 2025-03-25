import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

// Cargar variables de entorno basadas en NODE_ENV
const nodeEnv = process.env.NODE_ENV || 'development';
const envFile =
  nodeEnv === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: `src/${envFile}` });


export const DataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{ .ts,.js}'],
  synchronize: true,
  logging: false,
  //   ssl: true,
};

export const AppDs = new DataSource(DataSourceConfig);
