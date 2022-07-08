import { NextFunction, Request, Response } from 'express';

import * as UserService from './users.service';
import { responseSuccess, responseValidation } from '../../utilities/response';

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
        const userRegister = await UserService.registerUser(req.body);
        if (userRegister instanceof Array) {
            return responseValidation(res, userRegister);
        }
        delete userRegister.password;
        return responseSuccess(res, userRegister);
    } catch (err) {
        next(err);
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
        const userLogin = await UserService.loginUser(req.body);
        if (userLogin instanceof Array) {
            return responseValidation(res, userLogin);
        }
        return responseSuccess(res, userLogin);
    } catch (err) {
        next(err);
    }
};

export const getUserProfile = async (_req: Request, res: Response): Promise<Response> => {
    const userId = String(res.locals.userId);
    const getProfile = await UserService.getUserProfile(userId);

    delete getProfile?.password;

    return responseSuccess(res, getProfile);
};
