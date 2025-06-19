import { Router } from "express";
import { deleteTransactions, getTransactions, inputOutputTransactions, putTransactions } from "../controllers/transactionsController.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { transactionSchema } from "../schemas/transactionSchema.js";
import { validateToken } from "../middlewares/authMiddleware.js";

const transactionRouter = Router();

transactionRouter.use(validateToken);
transactionRouter.post("/transactions", validateSchema(transactionSchema), inputOutputTransactions);
transactionRouter.get("/transactions", getTransactions);
transactionRouter.put("/transactions/:id", validateSchema(transactionSchema), putTransactions);
transactionRouter.delete("/transactions/:id", deleteTransactions);

export default transactionRouter;