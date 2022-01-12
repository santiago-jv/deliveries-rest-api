import { Schema,model, Model } from "mongoose";

const MessengerSchema: Schema = new Schema({
    name:{
        type:String,
        required:true
    },

    address:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    identificationNumber:{
        type:String,
        required:true
    },
    numberCell:{
        type:String,
        required:true
    },
    motorcyclePlate:{
        type:String,
        required:true
    },
    deliveries:[{
        type:Schema.Types.ObjectId,
        ref:'Delivery'
    }],
 
    
},{timestamps:true})

MessengerSchema.set('toJSON', {
    transform:(document, object)=>{
        object.id = object._id;
        delete object.__v
        delete object._id
        return object;
    }
})

const Messenger:Model<any> = model('Messenger', MessengerSchema);

export default Messenger