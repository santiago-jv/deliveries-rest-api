import { Router } from "express";
import authRouter from "./authRouter";
import deliveriesRouter from "./deliveriesRouter";

const indexRouter: Router = Router();
indexRouter.use('/auth', authRouter)
indexRouter.use('/deliveries', deliveriesRouter);

export default indexRouter;