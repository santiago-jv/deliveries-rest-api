"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messengerValidation = void 0;
const express_validator_1 = require("express-validator");
exports.messengerValidation = [
    (0, express_validator_1.check)('name').notEmpty().withMessage('El campo Nombre es obligatorio').isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 letras'),
    (0, express_validator_1.check)('address').notEmpty().withMessage('El campo Dirección es obligatorio'),
    (0, express_validator_1.check)('gender').notEmpty().withMessage('El campo Género es obligatorio').isLength({ min: 1, max: 1 }).withMessage('El género solo puede ser M (Masculino) o F (Femenino)'),
    (0, express_validator_1.check)('identificationNumber').notEmpty().withMessage('El campo Número de identificación es obligatorio'),
    (0, express_validator_1.check)('numberCell').notEmpty().withMessage('El campo Número de teléfono es obligatorio'),
    (0, express_validator_1.check)('motorcyclePlate').notEmpty().withMessage('El campo Placa de la moto es obligatorio'),
];
