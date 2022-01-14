import { Request, Response } from "express";
import Delivery from "../models/Delivery";
import Messenger from "../models/Messenger";
import Petitioner from "../models/Petitioner";
import Receiver from "../models/Receiver";

export async function getDeliveries (request:Request,response:Response) {
    const {limit = 10, offset = 0} = request.query;
    console.log(request.headers.admin);
    try {
        const deliveries = await Delivery.find().skip(Number(offset)).limit(Number(limit)).populate('petitioner receiver');
        return response.status(200).json(deliveries)
    } catch (error) {
        return response.status(400).json({error})
    }
}
export async function getDelivery (request:Request,response:Response) {
    const {id} = request.params

    try {
        const deliveries = await Delivery.findById(id).populate('messenger petitioner receiver');
        return response.status(200).json(deliveries)
    } catch (error) {
        return response.status(400).json({error})
    }
}
export async function createDelivery (request:Request,response:Response) {
    const { description, pickUpTime, deliveryTime,petitioner, receiver} = request.body;  
    const createdBy = request.headers.admin
    const delivery = { description, pickUpTime, deliveryTime,createdBy}  
    const {messenger:messengerId} = request.query;

    try {
        const messenger = await Messenger.findById(messengerId);
        if(!messenger) return response.status(400).json({
            message:"Messenger not found"
        })
        const newPetitioner = await Petitioner.create({...petitioner,createdBy});
        const newReceiver = await Receiver.create({...receiver,createdBy});

        const newDelivery = await Delivery.create(delivery)
        newDelivery.messenger = messenger._id;
        newDelivery.petitioner = newPetitioner._id;
        newDelivery.receiver = newReceiver._id;
        await newDelivery.save()

        messenger.deliveries = messenger.deliveries.concat(newDelivery._id)
        await messenger.save()
        newPetitioner.delivery = newDelivery._id
        await newPetitioner.save()
        newReceiver.delivery = newDelivery._id
        await newReceiver.save()
        
        return response.status(201).json(newDelivery)

    } catch (error) {
        console.log(error);
        return response.status(500).json({error})
    }


}
export async function updateDelivery(request:Request,response:Response) {
    const { petitioner: petitionerData, receiver: receiverData,id, isComplete,description, pickUpTime,deliveryTime} = request.body
    

    try {
        const delivery = await Delivery.findById(id)

        if(!delivery) return response.status(400).json({message:"Delivery not found"})
        

           
        

        delivery.isComplete = isComplete
        delivery.description = description
        delivery.pickUpTime = pickUpTime
        delivery.deliveryTime = deliveryTime
        await delivery.save()

        await Petitioner.findByIdAndUpdate(delivery.petitioner,petitionerData)
        await Receiver.findByIdAndUpdate(delivery.receiver, receiverData)

        return response.status(200).json({message:"Delivery updated"})
    } catch (error) {
        console.log(error);
        return response.status(500).json({error})
    }
}
export async function deleteDelivery(request:Request,response:Response) {
    const {id} = request.params
    try {
        const delivery = await Delivery.findById(id)

        if(!delivery) return response.status(400).json({message:"Delivery not found"})

        await Delivery.deleteOne({_id:id})
        return response.status(200).json(delivery)
    } catch (error) {
        return response.status(500).json({error})
    }
}