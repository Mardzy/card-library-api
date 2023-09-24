import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import 'module-alias/register';

import { postgresDataSource } from './connections';

import router from './routes';

const { API_PORT } = process.env;
postgresDataSource
    .initialize()
    .then(() => {
        console.log('Postgres data source initialized!');
    })
    .catch((err) => {
        console.error('Error during Postgres data source initialization:', err);
    });

const app = express();

app.use(helmet());
app.use(
    cors({
        origin: 'http://localhost:5173'
    })
);
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

app.listen(API_PORT, () => {
    console.log(`Listening on port ${API_PORT}`);
});
