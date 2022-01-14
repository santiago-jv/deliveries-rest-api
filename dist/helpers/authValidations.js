"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidations = exports.loginValidations = void 0;
const express_validator_1 = require("express-validator");
exports.loginValidations = [
    (0, express_validator_1.check)('email').notEmpty().isEmail().normalizeEmail().withMessage('El campo Email es obligatorio y debe ser un email válido'),
    (0, express_validator_1.check)('password').notEmpty().withMessage('El campo Contraseña es obligatorio').isLength({ min: 8 }).withMessage('El campo contraseña debe tener al menos 8 caracteres')
];
exports.registerValidations = [
    (0, express_validator_1.check)('name').notEmpty().withMessage('El campo Nombre es obligatorio').isLength({ min: 2 }).withMessage('El campo debe tener mínimo 2 letras'),
    (0, express_validator_1.check)('email').notEmpty().isEmail().normalizeEmail().withMessage('El campo Email es obligatorio y debe ser un email válido'),
    (0, express_validator_1.check)('password').notEmpty().withMessage('El campo Contraseña es obligatorio').isLength({ min: 8 }).withMessage('El campo Contraseña debe tener al menos 8 caracteres')
];
