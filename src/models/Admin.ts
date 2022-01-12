import { Schema,model, Model } from "mongoose";

const AdminSchema: Schema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
    
},{timestamps:true})

AdminSchema.set('toJSON', {
    transform:(document, object)=>{
        object.id = object._id;
        delete object.__v
        delete object._id
        delete object.password
        return object;
    }
})

const Admin:Model<any> = model('Admin', AdminSchema);

export default Admin