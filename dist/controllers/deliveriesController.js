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
exports.deleteDelivery = exports.updateDelivery = exports.createDelivery = exports.getDelivery = exports.getDeliveries = void 0;
const Delivery_1 = __importDefault(require("../models/Delivery"));
const Messenger_1 = __importDefault(require("../models/Messenger"));
const Petitioner_1 = __importDefault(require("../models/Petitioner"));
const Receiver_1 = __importDefault(require("../models/Receiver"));
function getDeliveries(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { limit = 10, offset = 0 } = request.query;
        console.log(request.headers.admin);
        try {
            const deliveries = yield Delivery_1.default.find().skip(Number(offset)).limit(Number(limit)).populate('petitioner receiver');
            return response.status(200).json(deliveries);
        }
        catch (error) {
            return response.status(400).json({ error });
        }
    });
}
exports.getDeliveries = getDeliveries;
function getDelivery(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = request.params;
        try {
            const deliveries = yield Delivery_1.default.findById(id).populate('messenger petitioner receiver');
            return response.status(200).json(deliveries);
        }
        catch (error) {
            return response.status(400).json({ error });
        }
    });
}
exports.getDelivery = getDelivery;
function createDelivery(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { description, pickUpTime, deliveryTime, petitioner, receiver } = request.body;
        const createdBy = request.headers.admin;
        const delivery = { description, pickUpTime, deliveryTime, createdBy };
        const { messenger: messengerId } = request.query;
        try {
            const messenger = yield Messenger_1.default.findById(messengerId);
            if (!messenger)
                return response.status(400).json({
                    message: "Messenger not found"
                });
            const newPetitioner = yield Petitioner_1.default.create(Object.assign(Object.assign({}, petitioner), { createdBy }));
            const newReceiver = yield Receiver_1.default.create(Object.assign(Object.assign({}, receiver), { createdBy }));
            const newDelivery = yield Delivery_1.default.create(delivery);
            newDelivery.messenger = messenger._id;
            newDelivery.petitioner = newPetitioner._id;
            newDelivery.receiver = newReceiver._id;
            yield newDelivery.save();
            messenger.deliveries = messenger.deliveries.concat(newDelivery._id);
            yield messenger.save();
            newPetitioner.delivery = newDelivery._id;
            yield newPetitioner.save();
            newReceiver.delivery = newDelivery._id;
            yield newReceiver.save();
            return response.status(201).json(newDelivery);
        }
        catch (error) {
            console.log(error);
            return response.status(500).json({ error });
        }
    });
}
exports.createDelivery = createDelivery;
function updateDelivery(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { petitioner: petitionerData, receiver: receiverData, id, isComplete, description, pickUpTime, deliveryTime } = request.body;
        try {
            const delivery = yield Delivery_1.default.findById(id);
            if (!delivery)
                return response.status(400).json({ message: "Delivery not found" });
            if (isComplete) {
                const messenger = yield Messenger_1.default.findById(delivery.messenger);
                messenger.deliveries = messenger.deliveries.filter((delivery) => delivery.toString() !== delivery._id);
                yield messenger.save();
                delivery.messenger = null;
            }
            delivery.isComplete = isComplete;
            delivery.description = description;
            delivery.pickUpTime = pickUpTime;
            delivery.deliveryTime = deliveryTime;
            yield delivery.save();
            yield Petitioner_1.default.findByIdAndUpdate(delivery.petitioner, petitionerData);
            yield Receiver_1.default.findByIdAndUpdate(delivery.receiver, receiverData);
            return response.status(200).json({ message: "Delivery updated" });
        }
        catch (error) {
            console.log(error);
            return response.status(500).json({ error });
        }
    });
}
exports.updateDelivery = updateDelivery;
function deleteDelivery(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = request.params;
        try {
            const delivery = yield Delivery_1.default.findById(id);
            if (!delivery)
                return response.status(400).json({ message: "Delivery not found" });
            yield Delivery_1.default.deleteOne({ _id: id });
            return response.status(200).json(delivery);
        }
        catch (error) {
            return response.status(500).json({ error });
        }
    });
}
exports.deleteDelivery = deleteDelivery;
