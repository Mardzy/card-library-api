import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import { env } from 'node:process';
import { postgresDataSource } from 'connections';
import { router } from 'routes';
var API_PORT = env.API_PORT;
postgresDataSource
    .initialize()
    .then(function () {
    console.log('Postgres data source initialized!');
})
    .catch(function (err) {
    console.error('Error during Postgres data source initialization:', err);
});
var app = express();
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ extended: false }));
app.use('/api', router);
app.listen(API_PORT, function () {
    console.log("Listening on port ".concat(API_PORT));
});
