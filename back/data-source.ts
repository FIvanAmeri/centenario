import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './src/entities/user.entity'; // ← ajustá si tu path es distinto

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME ?? 'usuario',
  password: process.env.DB_PASSWORD ?? 'password',
  database: process.env.DB_NAME ?? 'centenario',
  entities: [User],
  migrations: ['./src/migrations/*.ts'],
  synchronize: false,
});