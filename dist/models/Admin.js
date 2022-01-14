"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AdminSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });
AdminSchema.set('toJSON', {
    transform: (document, object) => {
        object.id = object._id;
        delete object.__v;
        delete object._id;
        delete object.password;
        return object;
    }
});
const Admin = (0, mongoose_1.model)('Admin', AdminSchema);
exports.default = Admin;
