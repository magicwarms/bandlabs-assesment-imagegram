/**
 * Required External Modules and Interfaces
 */
import express from 'express';
import { verifyToken } from '../../middleware/authorization';
import * as PostController from './posts.controller';
/**
 * Router Definition
 */
const postRouter = express.Router();
/**
 * Controller Definitions
 */
postRouter.post('/submit', [verifyToken], PostController.submitPost);
postRouter.get('/all', PostController.getAllPosts);

export default postRouter;
