/**
 * Required External Modules and Interfaces
 */
import express from 'express';
import { verifyToken } from '../../middleware/authorization';
import * as UserController from './users.controller';
/**
 * Router Definition
 */
const userRouter = express.Router();
/**
 * Controller Definitions
 */
userRouter.get('/profile', [verifyToken], UserController.getUserProfile);
userRouter.post('/register', UserController.registerUser);
userRouter.post('/login', UserController.loginUser);

export default userRouter;
