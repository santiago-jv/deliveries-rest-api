import { Request, Response } from "express";
import Messenger from "../models/Messenger";

export async function getMessengers(request:Request, response:Response){
    const {limit = 10, offset = 0} = request.query;

    try {
        const messengers = await Messenger.find().skip(Number(offset)).limit(Number(limit));
        return response.status(200).json(messengers)
    } catch (error) {
        return response.status(400).json({error})
    }
}

export async function getMessenger(request:Request, response:Response){
    const {id} = request.params;

    try {
        const messenger = await Messenger.findById(id);
        return response.status(200).json(messenger)
    } catch (error) {
        return response.status(400).json({error})
    }
}
export async function createMessenger(request:Request, response:Response) {
    const messengerData = request.body;
    const createdBy = request.headers.admin
    try {
        const messenger = await Messenger.create({...messengerData,createdBy});
        return response.status(201).json(messenger)
    } catch (error) {
        return response.status(500).json({error})
    }
}

export async function updateMessenger(request:Request, response:Response) {
    const {id} = request.params
    const messengerData = request.body;
    try {
        await Messenger.findByIdAndUpdate(id,messengerData);
        return response.status(200).json({message:'Messenger Updated'})
    } catch (error) {
        return response.status(500).json({error})
    }
}

export async function deleteMessenger(request:Request, response:Response){
    const {id} = request.params
    
    try {
        await Messenger.findByIdAndDelete(id)
    } catch (error) {
        return response.status(500).json({error})
    }
}
