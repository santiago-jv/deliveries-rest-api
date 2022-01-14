"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messengerController_1 = require("../controllers/messengerController");
const messengerValidation_1 = require("../helpers/messengerValidation");
const verifyData_1 = require("../middlewares/verifyData");
const messengerRouter = (0, express_1.Router)();
messengerRouter.get('', messengerController_1.getMessengers);
messengerRouter.get('/:id', messengerController_1.getMessenger);
messengerRouter.post('', messengerValidation_1.messengerValidation, verifyData_1.verifyData, messengerController_1.createMessenger);
messengerRouter.put('/:id', messengerController_1.updateMessenger);
messengerRouter.delete('/:id', messengerController_1.deleteMessenger);
exports.default = messengerRouter;