import { Schema,model, Model } from "mongoose";

const DeliverySchema: Schema = new Schema({
    state:{
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

const Delivery:Model<any> = model('Delivery', DeliverySchema);

export default Delivery