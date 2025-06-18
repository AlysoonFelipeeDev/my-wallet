import { db } from "../config/database.js";
import { transactionSchema } from "../schemas/transactionSchema.js";

export async function inputOutputTransactions (req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();
    if(!token) return res.sendStatus(401);

    const {value, description, type } = req.body

    try {
        const user = await db.collection("sessions").findOne({token})
        if(!user) return res.sendStatus(401)

        await db.collection("transactions").insertOne({
            value,
            description,
            type, 
            userId: user._id,
            createdAt: new Date()
        })

        return res.sendStatus(201)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}