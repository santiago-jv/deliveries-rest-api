import { Router } from "express";
import { loginAdmin, registerAdmin } from "../controllers/authController";
const deliveriesRouter: Router = Router();

deliveriesRouter.get('', loginAdmin);
deliveriesRouter.post('',registerAdmin);

export default deliveriesRouter;