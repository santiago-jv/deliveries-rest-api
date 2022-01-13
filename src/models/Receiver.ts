import { Schema,model, Model } from "mongoose";

const ReceiverSchema: Schema = new Schema({
    name:{
        type:String,
        required:true
    },

    address:{
        type:String,
        required:true
    },
    numberCell:{
        type:String,
        required:true
    },
    delivery:{
        type:Schema.Types.ObjectId,
        ref:'Delivery'
    },
    createdBy:{
        ref:'Admin',
        type:Schema.Types.ObjectId
    }

},{timestamps:true})

ReceiverSchema.set('toJSON', {
    transform:(document, object)=>{
        object.id = object._id;
        delete object.__v
        delete object._id
        return object;
    }
})

const Receiver:Model<any> = model('Receiver', ReceiverSchema);

export default Receiver