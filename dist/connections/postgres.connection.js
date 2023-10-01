import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from 'node:process';
import { Product, Card } from 'entities';
var DB_HOST = env.DB_HOST, DB_NAME = env.DB_NAME, DB_PASS = env.DB_PASS, DB_PORT = env.DB_PORT, DB_USER = env.DB_USER;
export var postgresDataSource = new DataSource({
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
