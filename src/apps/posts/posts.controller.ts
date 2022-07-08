import { NextFunction, Request, Response } from 'express';

import * as PostService from './posts.service';
import { responseSuccess, responseValidation } from '../../utilities/response';

export const submitPost = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
        const userId = String(res.locals.userId);
        const userPost = await PostService.submitPost(req, userId);
        if (userPost instanceof Array) {
            return responseValidation(res, userPost);
        }
        return responseSuccess(res, userPost);
    } catch (err) {
        next(err);
    }
};

export const getAllPosts = async (_req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
        const getAllUserPosts = await PostService.getAllPosts();
        return responseSuccess(res, getAllUserPosts);
    } catch (err) {
        next(err);
    }
};
