import { Request, Response } from 'express';

import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';

const rateLimiter = rateLimit({
    windowMs: 30 * 1000,
    max: 30,
    handler: (_req: Request, res: Response) => {
        return res.status(429).json({
            success: false,
            data: {},
            message: 'Too many requests, please try again later.',
        });
    },
});

// Decrease response speed after first request
// Within 30 seconds
// At the same endpoint
const speedLimiter = slowDown({
    windowMs: 30 * 1000,
    delayAfter: 6,
    delayMs: 250,
});

export { rateLimiter, speedLimiter };
