"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessenger = exports.updateMessenger = exports.createMessenger = exports.getMessenger = exports.getMessengers = void 0;
const Messenger_1 = __importDefault(require("../models/Messenger"));
function getMessengers(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { limit = 10, offset = 0 } = request.query;
        try {
            const messengers = yield Messenger_1.default.find().skip(Number(offset)).limit(Number(limit));
            return response.status(200).json(messengers);
        }
        catch (error) {
            return response.status(400).json({ error });
        }
    });
}
exports.getMessengers = getMessengers;
function getMessenger(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = request.params;
        try {
            const messenger = yield Messenger_1.default.findById(id);
            return response.status(200).json(messenger);
        }
        catch (error) {
            return response.status(400).json({ error });
        }
    });
}
exports.getMessenger = getMessenger;
function createMessenger(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const messengerData = request.body;
        try {
            const messenger = yield Messenger_1.default.create(messengerData);
            return response.status(201).json(messenger);
        }
        catch (error) {
            return response.status(500).json({ error });
        }
    });
}
exports.createMessenger = createMessenger;
function updateMessenger(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = request.params;
        const messengerData = request.body;
        try {
            yield Messenger_1.default.findByIdAndUpdate(id, messengerData);
            return response.status(200).json({ message: 'Messenger Updated' });
        }
        catch (error) {
            return response.status(500).json({ error });
        }
    });
}
exports.updateMessenger = updateMessenger;
function deleteMessenger(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = request.params;
        try {
            yield Messenger_1.default.findByIdAndDelete(id);
        }
        catch (error) {
            return response.status(500).json({ error });
        }
    });
}
exports.deleteMessenger = deleteMessenger;
