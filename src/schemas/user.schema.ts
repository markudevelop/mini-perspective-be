import Joi from 'joi';

export const userSchema = Joi.object({
    name: Joi.string().required(),
    // created: Joi.date().required(),
});
