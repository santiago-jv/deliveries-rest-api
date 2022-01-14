"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PetitionerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    numberCell: {
        type: String,
        required: true
    },
    delivery: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Delivery'
    },
    createdBy: {
        ref: 'Admin',
        type: mongoose_1.Schema.Types.ObjectId
    }
}, { timestamps: true });
PetitionerSchema.set('toJSON', {
    transform: (document, object) => {
        object.id = object._id;
        delete object.__v;
        delete object._id;
        return object;
    }
});
const Petitioner = (0, mongoose_1.model)('Petitioner', PetitionerSchema);
exports.default = Petitioner;
