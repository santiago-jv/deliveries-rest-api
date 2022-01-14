"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MessengerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    identificationNumber: {
        type: String,
        required: true
    },
    numberCell: {
        type: String,
        required: true
    },
    motorcyclePlate: {
        type: String,
        required: true
    },
    deliveries: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Delivery'
        }],
    createdBy: {
        ref: 'Admin',
        type: mongoose_1.Schema.Types.ObjectId
    }
}, { timestamps: true });
MessengerSchema.set('toJSON', {
    transform: (document, object) => {
        object.id = object._id;
        delete object.__v;
        delete object._id;
        return object;
    }
});
const Messenger = (0, mongoose_1.model)('Messenger', MessengerSchema);
exports.default = Messenger;
