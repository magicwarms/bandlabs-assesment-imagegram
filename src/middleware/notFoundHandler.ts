import { Request, Response } from 'express';

const notFoundHandler = (_req: Request, res: Response): Response => res.status(404).json({
        success: true,
        data: {},
        message: 'API route not found',
    });

export default notFoundHandler;
