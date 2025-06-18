import { Router } from "express";
import { inputOutputTransactions } from "../controllers/transactionsController.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { transactionSchema } from "../schemas/transactionSchema.js";

const transactionRouter = Router();

transactionRouter.post("/transactions", validateSchema(transactionSchema), inputOutputTransactions);

export default transactionRouter;