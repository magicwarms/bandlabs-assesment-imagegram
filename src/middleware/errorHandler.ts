import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): Response => {
    if (err.message.includes('token')) {
        return res.status(401).json({
            success: false,
            data: {},
            errors: err.message,
        });
    }

    if (err.message.includes('exist')) {
        return res.status(409).json({
            success: false,
            data: {},
            errors: err.message,
        });
    }

    if (err.message.includes('wrong')) {
        return res.status(401).json({
            success: false,
            data: {},
            errors: err.message,
        });
    }

    if (err.message.includes('valid')) {
        return res.status(422).json({
            success: false,
            data: {},
            errors: err.message,
        });
    }

    return res.status(500).json({
        success: false,
        data: {},
        errors: `Error! (${err.message})`,
    });
};

export default errorHandler;
