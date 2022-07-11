import express, { Application } from 'express';
import cors from 'cors';
import { existsSync, mkdir } from 'fs';

import errorHandler from '../middleware/errorHandler';
import notFoundHandler from '../middleware/notFoundHandler';

import router from '../apps/routes';
import { rateLimiter, speedLimiter } from '../utilities/rateSpeedLimiter';

const createServer = (): Application => {
    const app: Application = express();

    /**
     *  App Configuration
     */
    app.use(
        cors({
            origin: '*',
            optionsSuccessStatus: 200,
            methods: ['GET', 'POST'],
        }),
    );
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api/v1', rateLimiter, speedLimiter, router);

    // handle 404
    app.use(notFoundHandler);

    // handle 500 Any error
    app.use(errorHandler);

    // create initial upload folder
    const uploadFolder = process.cwd() + '/public/files';
    if (!existsSync(uploadFolder))
        mkdir(uploadFolder, { recursive: true }, (err) => {
            if (err) throw new Error('Error when created initial upload folder');
        });

    return app;
};

export default createServer;
