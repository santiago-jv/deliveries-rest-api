import { check, ValidationChain } from "express-validator";

export const messengerValidation:ValidationChain[] = [
    check('name').notEmpty().withMessage('El campo Nombre es obligatorio').isLength({min:2}).withMessage('El nombre debe tener al menos 2 letras'),
    check('address').notEmpty().withMessage('El campo Dirección es obligatorio'),
    check('gender').notEmpty().withMessage('El campo Género es obligatorio').isLength({min:1, max:1}).withMessage('El género solo puede ser M (Masculino) o F (Femenino)') ,
    check('identificationNumber').notEmpty().withMessage('El campo Número de identificación es obligatorio'),
    check('numberCell').notEmpty().withMessage('El campo Número de teléfono es obligatorio'),
    check('motorcyclePlate').notEmpty().withMessage('El campo Placa de la moto es obligatorio'),

]