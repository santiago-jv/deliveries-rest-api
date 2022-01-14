"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deliveryValidation = void 0;
const express_validator_1 = require("express-validator");
exports.deliveryValidation = [
    (0, express_validator_1.check)('description').notEmpty().withMessage('El campo Description es obligatorio'),
    (0, express_validator_1.check)('pickUpTime').notEmpty().withMessage('El campo Hora de recogida es obligatorio'),
    (0, express_validator_1.check)('deliveryTime').notEmpty().withMessage('El campo Hora de entrega es obligatorio'),
    (0, express_validator_1.check)('petitioner').isObject().withMessage('Petitioner debe ser un objeto'),
    (0, express_validator_1.check)('petitioner.name').notEmpty().withMessage('El nombre del solicitante es obligatorio'),
    (0, express_validator_1.check)('petitioner.address').notEmpty().withMessage('La dirección del solicitante es obligatoria'),
    (0, express_validator_1.check)('petitioner.numberCell').notEmpty().withMessage('El número de teléfono del solicitante es obligatorio'),
    (0, express_validator_1.check)('receiver').isObject().withMessage('Receiver debe ser un objeto'),
    (0, express_validator_1.check)('receiver.name').notEmpty().withMessage('El nombre del Destinatario es obligatorio'),
    (0, express_validator_1.check)('receiver.address').notEmpty().withMessage('La dirección del Destinatario es obligatoria'),
    (0, express_validator_1.check)('receiver.numberCell').notEmpty().withMessage('El número de teléfono del Destinatario es obligatorio'),
];
