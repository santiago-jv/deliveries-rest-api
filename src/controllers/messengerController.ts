import { Request, Response } from "express";
import Messenger from "../models/Messenger";

export async function createMessenger(request:Request, response:Response) {
    const messengerData = request.body;
    try {
        const messenger = await Messenger.create(messengerData);
        return response.status(201).json(messenger)
    } catch (error) {
        return response.status(500).json({error})
    }
}