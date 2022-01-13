import { Router } from "express";
import authMiddleware from "../middlewares/Authorization";
import authRouter from "./authRouter";
import deliveriesRouter from "./deliveriesRouter";
import messengerRouter from "./messengerRouter";

const indexRouter: Router = Router();
indexRouter.use('/auth', authRouter)
indexRouter.use('/deliveries',authMiddleware, deliveriesRouter);
indexRouter.use('/messengers', authMiddleware, messengerRouter);

export default indexRouter;