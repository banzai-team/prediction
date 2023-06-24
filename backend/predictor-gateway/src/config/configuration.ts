import { DataSourceOptions } from 'typeorm';

const dbConfig = (): DataSourceOptions => ({
  type: 'postgres',
  dropSchema: false,
  synchronize: false,
  ssl: Boolean(Number(process.env.DB_SSL)),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  schema: process.env.DB_SCHEMA,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  migrations: [__dirname + '/../db/migrations/**/*{.ts,.js}'],
});

const predictorConfig = (): {host: string, port: number} => ({
  host: process.env.PREDICTOR_HOST,
  port: Number(process.env.PREDICTOR_PORT)
});

export const config = () => ({
  db: dbConfig(),
  predictor: predictorConfig(),
});

export const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;