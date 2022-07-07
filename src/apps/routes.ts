import express, { Request, Response } from 'express';

// import organizationRouter from './apps/organization/organization.routes';
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
router.use('/boom', (): void => {
    throw new Error('Error occured');
});
// router.use('/employees', organizationRouter);

export default router;
