import { Router } from "express";
import { signIn, signUp } from "../controllers/usersController.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { logginSchema, registerSchema } from "../schemas/userSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(registerSchema), signUp);
authRouter.post("/sign-in", validateSchema(logginSchema), signIn);

export default authRouter;