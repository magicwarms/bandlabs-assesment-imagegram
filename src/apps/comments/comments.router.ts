/**
 * Required External Modules and Interfaces
 */
import express from 'express';
import { verifyToken } from '../../middleware/authorization';
import * as CommentController from './comments.controller';
/**
 * Router Definition
 */
const commentRouter = express.Router();
/**
 * Controller Definitions
 */
commentRouter.post('/submit', [verifyToken], CommentController.submitComment);
commentRouter.delete('/delete', [verifyToken], CommentController.deleteComment);

export default commentRouter;
