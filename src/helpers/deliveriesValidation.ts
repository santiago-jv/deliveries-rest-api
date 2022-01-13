import { check, ValidationChain } from "express-validator";

export const deliveryValidation:ValidationChain[] = [
    check('description').notEmpty().withMessage('El campo Description es obligatorio'),
    check('pickUpTime').notEmpty().withMessage('El campo Hora de recogida es obligatorio'),
    check('deliveryTime').notEmpty().withMessage('El campo Hora de entrega es obligatorio'),
    check('petitioner').isObject().withMessage('Petitioner debe ser un objeto'),
    check('petitioner.name').notEmpty().withMessage('El nombre del solicitante es obligatorio'),
    check('petitioner.address').notEmpty().withMessage('La dirección del solicitante es obligatoria'),
    check('petitioner.numberCell').notEmpty().withMessage('El número de teléfono del solicitante es obligatorio'),
    check('receiver').isObject().withMessage('Receiver debe ser un objeto'),
    check('receiver.name').notEmpty().withMessage('El nombre del Destinatario es obligatorio'),
    check('receiver.address').notEmpty().withMessage('La dirección del Destinatario es obligatoria'),
    check('receiver.numberCell').notEmpty().withMessage('El número de teléfono del Destinatario es obligatorio'),
]
