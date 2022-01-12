import { Router } from "express";
import { loginAdmin, registerAdmin } from "../controllers/authController";
const authRouter: Router = Router();

authRouter.post('/login', loginAdmin);
authRouter.post('/register',registerAdmin);

export default authRouter;