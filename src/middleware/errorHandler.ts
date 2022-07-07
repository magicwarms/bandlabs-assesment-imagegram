import { NextFunction, Request, Response } from 'express';

type errorFormat = {
    success: boolean;
    data: string | boolean | Error;
    message: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: errorFormat, _req: Request, res: Response, _next: NextFunction): Response =>
    res.status(500).json({
        success: false,
        data: {},
        message: `Error! (${err.message})`,
    });

export default errorHandler;
