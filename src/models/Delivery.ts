import { Schema,model, Model } from "mongoose";
import Messenger from "./Messenger";
import Petitioner from "./Petitioner";
import Receiver from "./Receiver";

const DeliverySchema: Schema = new Schema({
    isComplete:{
        type:Boolean,
        default:false
    },
    description:{
        type:String,
        required:true
    },
    pickUpTime:{
        type:String,
        required:true
    },
    deliveryTime:{
        type:String,
        required:true
    },
    messenger:{
        type:Schema.Types.ObjectId,
        ref:'Messenger'
    },
    petitioner:{
        type:Schema.Types.ObjectId,
        ref:'Petitioner'
    },
    receiver:{
        type:Schema.Types.ObjectId,
        ref:'Receiver'
    }
    
},{timestamps:true})

DeliverySchema.set('toJSON', {
    transform:(document, object)=>{
        object.id = object._id;
        delete object.__v
        delete object._id
        return object;
    }
})

DeliverySchema.pre('deleteOne', async function(next){
    await Petitioner.deleteOne({delivery:this._conditions._id });
    await Receiver.deleteOne({delivery:this._conditions._id});
    const delivery = await this.model.findById(this._conditions._id)
    const messenger = await Messenger.findById(delivery.messenger)
    messenger.deliveries = messenger.deliveries.filter((delivery:any) => delivery.toString() !== this._conditions._id)
    await messenger.save()
    next()
})

const Delivery:Model<any> = model('Delivery', DeliverySchema);

export default Delivery