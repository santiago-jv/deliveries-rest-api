import { Router } from "express";
import authRouter from "./authRouter";
import deliveriesRouter from "./deliveriesRouter";
import messengerRouter from "./messengerRouter";

const indexRouter: Router = Router();
indexRouter.use('/auth', authRouter)
indexRouter.use('/deliveries', deliveriesRouter);
indexRouter.use('/messengers', messengerRouter);

export default indexRouter;