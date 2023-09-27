import { Request, Response, NextFunction } from 'express';

import User, { IUser } from '../models/user.model';
import { userSchema } from '../schemas/user.schema';

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    const { error } = userSchema.validate(req.body);

    if (error) {
        next({ status: 400, message: error.details });
        return;
    }

    try {
        const user: IUser = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        next(error);
    }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { created } = req.query as { created: string };
        const query = User.find();

        if (created) {
            const order = created === 'asc' ? 1 : -1; // Convert "asc" to 1 and anything else to -1
            query.sort({ created: order });
        }

        const users = await query.exec();
        res.status(200).send(users);
    } catch (error) {
        next(error);
    }
};
