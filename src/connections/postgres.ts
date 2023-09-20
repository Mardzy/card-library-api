import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { Product, Card } from '../entities';

const { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } = process.env;

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
