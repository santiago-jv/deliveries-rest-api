import { Router } from "express";
import { createMessenger } from "../controllers/messengerController";
import { messengerValidation } from "../helpers/messengerValidation";
import { verifyData } from "../middlewares/verifyData";

const messengerRouter = Router();
messengerRouter.post('',messengerValidation,verifyData, createMessenger);

export default messengerRouter