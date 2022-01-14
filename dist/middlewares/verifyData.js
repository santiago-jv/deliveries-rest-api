"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyData = void 0;
const express_validator_1 = require("express-validator");
function verifyData(request, response, next) {
    const result = (0, express_validator_1.validationResult)(request);
    if (!result.isEmpty()) {
        return response.status(400).json({
            errors: result.mapped()
        });
    }
    next();
}
exports.verifyData = verifyData;
