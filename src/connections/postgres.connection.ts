import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from 'node:process';

import { Product, Card } from '../entities';

const { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } = env;

export const postgresDataSource = new DataSource({
    type: 'postgres',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    entities: [Card, Product],
    migrations: ['./src/migrations/*.ts'],
    synchronize: true
});
