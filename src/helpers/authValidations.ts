import { check, ValidationChain } from "express-validator";

export const loginValidations:ValidationChain[] = [
    check('email').notEmpty().isEmail().normalizeEmail().withMessage('El campo Email es obligatorio y debe ser un email válido'),
    check('password').notEmpty().withMessage('El campo Contraseña es obligatorio').isLength({min:8}).withMessage('El campo contraseña debe tener al menos 8 caracteres')
]

export const registerValidations:ValidationChain[] = [
    check('name').notEmpty().withMessage('El campo Nombre es obligatorio').isLength({min:2}).withMessage('El campo debe tener mínimo 2 letras') ,
    check('email').notEmpty().isEmail().normalizeEmail().withMessage('El campo Email es obligatorio y debe ser un email válido'),
    check('password').notEmpty().withMessage('El campo Contraseña es obligatorio').isLength({min:8}).withMessage('El campo Contraseña debe tener al menos 8 caracteres')
    
]