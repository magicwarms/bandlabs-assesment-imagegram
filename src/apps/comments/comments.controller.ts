import { NextFunction, Request, Response } from 'express';

import * as CommentService from './comments.service';
import { responseSuccess, responseValidation } from '../../utilities/response';

export const submitComment = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
        req.body.commentedBy = String(res.locals.userId);
        const userComment = await CommentService.submitComment(req.body);
        if (userComment instanceof Array) {
            return responseValidation(res, userComment);
        }
        return responseSuccess(res, userComment);
    } catch (err) {
        next(err);
    }
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
        req.body.commentedBy = String(res.locals.userId);
        const deleteComment = await CommentService.deleteComment(req.body);
        if (deleteComment instanceof Array) {
            return responseValidation(res, deleteComment);
        }
        return responseSuccess(res, deleteComment.affected ? { delete: true } : { delete: false });
    } catch (err) {
        next(err);
    }
};
