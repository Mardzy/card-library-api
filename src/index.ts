import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { env } from 'node:process';

import { postgresDataSource } from './connections';

const { API_PORT } = env;
import { router } from './routes';

const server = express();

postgresDataSource
    .initialize()
    .then(() => {
        server.use(helmet());
        server.use(
            cors({
                origin: 'http://localhost:5173'
            })
        );
        server.use(express.json({ limit: '200mb' }));
        server.use(express.urlencoded({ extended: false }));
        server.use('/api', router);

        console.log('Postgres data source initialized!');

        server.listen(API_PORT, () => {
            console.log(`Listening on port ${API_PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error during Postgres data source initialization:', err);
    });
