import { db } from "../config/database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export async function signUp (req,res) {
    const { name, email, password } = req.body;
    
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

    try {
        const user = await db.collection("users").findOne({ email })
        if(!user) return res.sendStatus(404)
        
        const passwordAIsValid = bcrypt.compareSync(password, user.password)
        if(passwordAIsValid) {
            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn : 86400});
            const session = {
                token,
                userId: user._id
            }
            await db.collection("sessions").insertOne(session)
            return res.status(200).send(token)

            
        }
        
        return res.sendStatus(401)
    } catch (error) {
        res.status(500).send(error.message)
    }
}