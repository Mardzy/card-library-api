import 'dotenv/config';
import { env } from 'node:process';

import { postgresDataSource, server } from './connections';

const { API_PORT } = env;
postgresDataSource
    .initialize()
    .then(() => {
        console.log('Postgres data source initialized!');

        server.listen(API_PORT, () => {
            console.log(`Listening on port ${API_PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error during Postgres data source initialization:', err);
    });
