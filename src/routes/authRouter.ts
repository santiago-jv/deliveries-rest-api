import { Router } from "express";
import { loginAdmin, registerAdmin } from "../controllers/authController";
import { loginValidations, registerValidations } from "../helpers/authValidations";
import { verifyData } from "../middlewares/verifyData";
const authRouter: Router = Router();

authRouter.post('/login', loginValidations,verifyData,loginAdmin);
authRouter.post('/register', registerValidations,verifyData,registerAdmin);

export default authRouter;