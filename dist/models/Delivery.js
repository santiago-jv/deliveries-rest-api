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
const mongoose_1 = require("mongoose");
const Messenger_1 = __importDefault(require("./Messenger"));
const Petitioner_1 = __importDefault(require("./Petitioner"));
const Receiver_1 = __importDefault(require("./Receiver"));
const DeliverySchema = new mongoose_1.Schema({
    isComplete: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true
    },
    pickUpTime: {
        type: String,
        required: true
    },
    deliveryTime: {
        type: String,
        required: true
    },
    messenger: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Messenger'
    },
    petitioner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Petitioner'
    },
    receiver: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Receiver'
    },
    createdBy: {
        ref: 'Admin',
        type: mongoose_1.Schema.Types.ObjectId
    }
}, { timestamps: true });
DeliverySchema.set('toJSON', {
    transform: (document, object) => {
        object.id = object._id;
        delete object.__v;
        delete object._id;
        return object;
    }
});
DeliverySchema.pre('deleteOne', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Petitioner_1.default.deleteOne({ delivery: this._conditions._id });
        yield Receiver_1.default.deleteOne({ delivery: this._conditions._id });
        const delivery = yield this.model.findById(this._conditions._id);
        const messenger = yield Messenger_1.default.findById(delivery.messenger);
        messenger.deliveries = messenger.deliveries.filter((delivery) => delivery.toString() !== this._conditions._id);
        yield messenger.save();
        delivery.messenger = null;
        next();
    });
});
const Delivery = (0, mongoose_1.model)('Delivery', DeliverySchema);
exports.default = Delivery;
