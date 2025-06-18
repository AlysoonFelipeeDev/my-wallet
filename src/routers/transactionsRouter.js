import { Router } from "express";
import { inputOutputTransactions } from "../controllers/transactionsController.js";

const transactionRouter = Router();

transactionRouter.post("/transactions", inputOutputTransactions);

export default transactionRouter;