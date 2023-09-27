import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction,
): Response => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    return res.status(status).send({ message });
};
