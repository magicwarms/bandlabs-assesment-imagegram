import express, { Application } from 'express';
import cors from 'cors';

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

    app.use('/', rateLimiter, speedLimiter, router);

    // handle 404
    app.use(notFoundHandler);

    // handle 500 Any error
    app.use(errorHandler);

    return app;
};

export default createServer;
