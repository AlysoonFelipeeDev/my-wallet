import { db } from "../config/database.js";
import Joi  from "joi";
import bcrypt from "bcrypt";

export async function signUp (req,res) {
    const { name, email, password } = req.body;
    
    const registerSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(6).required()
    })
    
    const validation = registerSchema.validate(req.body, {abortEarly: false})
    if(validation.error){
        const errors = validation.error.details.map( detail => detail.message)
        return res.status(422).send(errors)
    }
    
    try {
        const user = await db.collection("users").findOne({ email })
        if(user) return res.status(409).send("Usuario já existe!")
            
        const hash = bcrypt.hashSync(password, 10)
        await db.collection("users").insertOne({name, email, password: hash})

        res.status(201).send("Cadastro realizado!")
    } catch (error) {
        res.status(500).send(error.message)
    }
};

export async function signIn (req, res ) {
    const { email, password } = req.body;

    const logginSchema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })

    const validation = logginSchema.validate(req.body, {abortEarly: false})
    if(validation.error){
        const errors = validation.error.details.map(detail => detail.message)
        return res.status(422).send(errors)
    }

    try {
        const user = await db.collection("users").findOne({ email })
        if(!user) return res.sendStatus(404)
        
        const passwordAIsValid = bcrypt.compareSync(password, user.password)
        if(!passwordAIsValid) return res.sendStatus(401)
        
        return res.sendStatus(200)
    } catch (error) {
        res.status(500).send(error.message)
    }
}