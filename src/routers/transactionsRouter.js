import { Router } from "express";
import { inputOutputTransactions } from "../controllers/transactionsController.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { transactionSchema } from "../schemas/transactionSchema.js";
import { validateToken } from "../middlewares/authMiddleware.js";

const transactionRouter = Router();

transactionRouter.use(validateToken);
transactionRouter.post("/transactions", validateSchema(transactionSchema), inputOutputTransactions);

export default transactionRouter;