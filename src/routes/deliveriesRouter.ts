import { Router } from "express";
import { changeIsCompleteOfDelivery, createDelivery, deleteDelivery, getDeliveries, getDelivery, updateDelivery } from "../controllers/deliveriesController";
import { deliveryValidation } from "../helpers/deliveriesValidation";
import { verifyData } from "../middlewares/verifyData";

const deliveriesRouter: Router = Router();

deliveriesRouter.get('',getDeliveries);
deliveriesRouter.get('/:id',getDelivery);
deliveriesRouter.post('',deliveryValidation, verifyData, createDelivery);
deliveriesRouter.put('/:id', deliveryValidation, verifyData, updateDelivery)
deliveriesRouter.delete('/:id', deleteDelivery);
deliveriesRouter.patch('/:id', changeIsCompleteOfDelivery);
export default deliveriesRouter;