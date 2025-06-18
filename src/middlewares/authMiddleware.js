import { db } from "../config/database.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
dotenv.config();

export async function validateToken (req, res, next) {

    try {
        const { authorization } = req.headers;
        if(!authorization) return res.sendStatus(401);

        const token = authorization?.replace("Bearer ", "").trim();
        if(!token) return res.sendStatus(401);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded || !decoded.userId) return res.sendStatus(401);

        const user = await db.collection("users").findOne({
            _id: new ObjectId(decoded.userId)
        })
        if(!user) return res.sendStatus(401);

        res.locals.user = user

        next();
        
    } catch (error) {
        res.status(500).send(error.message)
    }

}