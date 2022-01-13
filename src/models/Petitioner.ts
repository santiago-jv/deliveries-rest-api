import { Schema,model, Model } from "mongoose";

const PetitionerSchema: Schema = new Schema({
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

PetitionerSchema.set('toJSON', {
    transform:(document, object)=>{
        object.id = object._id;
        delete object.__v
        delete object._id
        return object;
    }
})

const Petitioner:Model<any> = model('Petitioner', PetitionerSchema);

export default Petitioner