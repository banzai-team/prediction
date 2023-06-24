import { DataSourceOptions } from 'typeorm';

const dbConfig = (): DataSourceOptions => ({
  type: 'postgres',
  dropSchema: false,
  synchronize: false,
  ssl: Boolean(Number(process.env.DB_SSL)),
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  schema: process.env.DB_SCHEMA,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
});

const predictorConfig = (): { host: string, port: number } => ({
  host: process.env.PREDICTOR_HOST,
  port: Number(process.env.PREDICTOR_PORT)
});

const rabbitmq = () => ({
  host: process.env.RABBIT_HOST,
  port: process.env.RABBIT_PORT ? parseInt(process.env.RABBIT_PORT, 10) : 15672,
  username: process.env.RABBIT_USERNAME
});

export const config = () => ({
  db: dbConfig(),
  predictor: predictorConfig(),
  rabbitmq: rabbitmq(),
});

export type Config = ReturnType<typeof config>;

export const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;