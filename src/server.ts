import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { router } from '@routes';

const server = express();

server.use(helmet());
server.use(
    cors({
        origin: 'http://localhost:5173'
    })
);
server.use(express.json({ limit: '200mb' }));
server.use(express.urlencoded({ extended: false }));

server.use('/api', router);

export { server };
