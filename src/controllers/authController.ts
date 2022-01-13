import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from "express";
import Admin from "../models/Admin";
import jwt from "jsonwebtoken"

export async function loginAdmin (request:Request,response:Response, next: NextFunction) {
    const {email,password} = request.body

    try {
        const admin = await Admin.findOne({email});
        if(!admin){
            return response.status(400).json({
                message:'The email no exist'
            })
        }

        const isValidPassword = await bcrypt.compare(password, admin.password);
        if(!isValidPassword){
            return response.status(400).json({
                message:'Invalid password'
            })
        }

        const token = jwt.sign({id:admin._id}, process.env.JWT_SECRET!)
        
        return response.status(201).json({
            message:'Admin authenticated succesfully',
            admin,
            token
        })
    } catch (error) {
        return response.status(500).json({
            error
        })
    }
}

export async function registerAdmin (request:Request,response:Response, next: NextFunction) {
    const {name,email,password} = request.body

    try {
        const admin = await Admin.findOne({email});
        if(admin){
            return response.status(400).json({
                message:'The email field already in use'
            })
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await Admin.create({name,email,password:encryptedPassword})
        const token = jwt.sign({id:newAdmin._id}, process.env.JWT_SECRET!)

        return response.status(201).json({
            message:'Admin created succesfully',
            admin:newAdmin,
            token
        })
    } catch (error) {
        return response.status(500).json({
            error
        })
    }
}

