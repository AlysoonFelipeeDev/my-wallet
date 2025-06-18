import { db } from "../config/database.js";

export async function inputOutputTransactions (req, res) {
    const {value, description, type } = req.body
    const user = res.locals.user

    try {

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