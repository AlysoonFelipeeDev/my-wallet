import express, { json } from "express";
import cors from "cors";
import authRouter from "./routers/authRouter.js"
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use(authRouter)

const port = process.env.PORT || 6000;
app.listen(port, () => {
    console.log(`Rodando liso na porta: ${port}`);
})