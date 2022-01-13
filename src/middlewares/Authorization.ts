import { NextFunction, Request, Response } from "express";
import  jwt, { JwtPayload } from "jsonwebtoken";
declare module "jsonwebtoken" {
    export interface JwtPayload {
        id: string;
    }
}
function authMiddleware (request:Request, response:Response, next: NextFunction) {
    let token:string|undefined = request.headers.authorization
    if(!token){
        return response.status(403).json({
            message:"Token not provided"
        })
    }
    if(!token.startsWith('Bearer')) return response.status(400).json({
        message:'Token must be of type Bearer'
    })


    token = token.slice(7)

    try {
        const payload:JwtPayload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
        console.log(payload);
        request.headers.admin = payload.id
        
    } catch (error) {
        return response.status(401).json({
            message:"Invalid token"
        })
    }
    

    next()
}

export default authMiddleware