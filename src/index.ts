import * as dotenv from 'dotenv';
import express from 'express';

import { AppDataSource } from './dataSource';

import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';
import router from './routes';

dotenv.config();
const port = process.env.PORT;
AppDataSource.initialize().then(() => {
    const app = express();

    app.use(helmet());
    app.use(
        cors({
            origin: 'http://localhost:3000'
        })
    );
    app.use(express.json({ limit: '200mb' }));
    app.use(express.urlencoded({ extended: false }));
    app.use((req, res, next) => {
        res.append(
            'Access-Control-Allow-Headers',
            'origin, X-Requested-With,Content-Type,Accept, Authorization'
        );

        if (req.method === 'OPTIONS') {
            res.append('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
            return res.status(200).json({});
        }

        next();
    });
    app.use('/api', router);

    return app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
});
