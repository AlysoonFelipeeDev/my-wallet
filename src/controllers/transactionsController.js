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
};

export async function getTransactions (req, res) {
    const user = res.locals.user;

    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    if(isNaN(page) || page <= 0 ) return res.sendStatus(400);

    const skip = (page - 1) * limit;

    try {
        const transactions = await db.collection("transactions")
        .find({userId: user._id})
        .limit(limit)
        .skip(skip)
        .sort({createdAt: - 1})
        .toArray();

        return res.send(transactions)
    } catch (error) {
        res.status(500).send(error.message)
    }
};