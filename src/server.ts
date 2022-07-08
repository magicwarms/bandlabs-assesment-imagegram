/**
 * Required External Modules
 */
// import 'module-alias/register';
import * as dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import http, { Server } from 'http';
import createServer from './config/express';
import AppDataSource from './config/datasource';

/**
 * Set timezone
 */
process.env.TZ = 'Asia/Jakarta';

// define var for current server time
const currentTime = `${new Date().toJSON().slice(0, 10).replace(/-/g, '/')} ${new Date(Date.now()).toTimeString()}`;
/**
 * App Variables
 */
if (!process.env.PORT) {
    console.log('Server exit without set PORT');
    process.exit(1);
}

const PORT: number | string = process.env.PORT || 9000;

// ensures we close the server in the event of an error.
const setupCloseOnExit = (server: Server) => {
    async function exitHandler(options = { exit: false }) {
        server.close(() => {
            if (options.exit) {
                console.info(`Server successfully closed at ${currentTime}`);
                process.exit(1);
            }
        });
    }

    // do something when app is closing
    process.on('exit', exitHandler);
    // catches ctrl+c event
    process.on('SIGINT', exitHandler.bind(null, { exit: true }));
    // catches "kill pid" (for example: nodemon restart)
    process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
    process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));
    // catches uncaught exceptions
    process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
};

/**
 * Server Activation
 */
const startServer = async () => {
    AppDataSource.initialize()
        .then(() => {
            console.log('Data Source has been initialized!');
        })
        .catch((err) => {
            console.error('Error during Data Source initialization', err);
        });
    const app = await createServer();
    const server = http.createServer(app).listen(PORT, () => {
        console.info(
            `⚡️[bandlabs-backend]: Server is running at ${process.env.APP_LINK}:${PORT} - ${currentTime} - ${process.env.NODE_ENV}`,
        );
        // this ensures that we properly close the server when the program exists
        setupCloseOnExit(server);
    });
};

/**
 * Start server now
 */
startServer();
