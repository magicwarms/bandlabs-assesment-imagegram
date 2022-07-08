import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): Response =>
    res.status(500).json({
        success: false,
        data: {},
        errors: `Error! (${err.message})`,
    });

export default errorHandler;
