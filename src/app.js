import express, { json } from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(json());

const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

try {
    await mongoClient.connect();
    console.log("Conexão estabelecida com sucesso!")
    db = mongoClient.db()
} catch (error) {
    console.log(error.message)
}

const port = process.env.PORT || 6000;
app.listen(port, () => {
    console.log(`Rodando liso na porta: ${port}`);
})