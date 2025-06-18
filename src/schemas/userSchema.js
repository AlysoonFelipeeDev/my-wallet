import Joi from "joi";

    export const registerSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(6).required()
    }); 

    export const logginSchema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })