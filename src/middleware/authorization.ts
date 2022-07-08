import { NextFunction, Request, Response } from 'express';
import isEmpty from 'lodash/isEmpty';
import jwt from 'jsonwebtoken';
import { AuthenticatedUser } from '../apps/users/entity/authentication';

export const verifyToken = (req: Request, res: Response, next: NextFunction): Response | undefined | NextFunction => {
    const token = req.header('Authorization') ?? '';
    if (isEmpty(token)) {
        return res.status(403).json({
            success: false,
            data: {},
            message: "Token doesn't exist",
        });
    }

    const JWT_SECRET = process.env.APP_KEY as string;

    const splitBearerToken = token.split(' ');

    const decoded = jwt.verify(splitBearerToken[1].trim(), JWT_SECRET, {
        algorithms: ['HS512'],
    }) as AuthenticatedUser;

    if (decoded) {
        // Set the session on response.locals object for routes to access
        res.locals = {
            ...res.locals,
            userId: decoded.id,
            username: decoded.username,
        };
    }
    next();
};
