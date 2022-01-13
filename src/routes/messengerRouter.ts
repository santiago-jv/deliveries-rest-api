import { Router } from "express";
import { createMessenger, deleteMessenger, getMessenger, getMessengers, updateMessenger } from "../controllers/messengerController";
import { messengerValidation } from "../helpers/messengerValidation";
import { verifyData } from "../middlewares/verifyData";

const messengerRouter = Router();

messengerRouter.get('',getMessengers);
messengerRouter.get('/:id', getMessenger);
messengerRouter.post('',messengerValidation,verifyData, createMessenger);
messengerRouter.put('/:id', updateMessenger);
messengerRouter.delete('/:id', deleteMessenger);


export default messengerRouter;