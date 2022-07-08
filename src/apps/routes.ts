import express, { Request, Response } from 'express';

import userRouter from '../apps/users/users.router';
import postRouter from '../apps/posts/posts.router';

/**
 * Router Definition
 */
const router = express.Router();
/**
 * Controller Definition
 */
router.use(
    '/health',
    (_req: Request, res: Response): Response =>
        res.status(200).json({
            success: true,
            data: {},
            message: `System UP and Running (${process.env.APP_NAME} - ${process.env.NODE_ENV})`,
        }),
);

router.use('/users', userRouter);
router.use('/posts', postRouter);

export default router;
