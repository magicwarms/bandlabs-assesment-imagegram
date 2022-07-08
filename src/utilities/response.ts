import { ValidationError } from 'class-validator';
import { Response } from 'express';

export const responseSuccess = (res: Response, data: unknown): Response => {
    return res.status(200).json({
        success: true,
        data: typeof data !== 'undefined' ? data : null,
        errors: null,
    });
};

export const responseValidation = (res: Response, error: ValidationError[]): Response => {
    return res.status(422).json({
        success: false,
        data: {},
        errors: error.map((item) => item.constraints),
    });
};
