"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authorization_1 = __importDefault(require("../middlewares/Authorization"));
const authRouter_1 = __importDefault(require("./authRouter"));
const deliveriesRouter_1 = __importDefault(require("./deliveriesRouter"));
const messengerRouter_1 = __importDefault(require("./messengerRouter"));
const indexRouter = (0, express_1.Router)();
indexRouter.use('/auth', authRouter_1.default);
indexRouter.use('/deliveries', Authorization_1.default, deliveriesRouter_1.default);
indexRouter.use('/messengers', Authorization_1.default, messengerRouter_1.default);
exports.default = indexRouter;
