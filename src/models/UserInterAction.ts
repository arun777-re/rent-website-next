import mongoose from 'mongoose';


const userInteractionSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    category:String,
    propertyId:{
       type:mongoose.Schema.Types.ObjectId,ref:'Property'
    },
    type:{type:String,enum:["click","view"],required:true},
    count:{type:Number,default:1},

},{timestamps:true});

const UserInteraction = mongoose.models.UserInteraction || mongoose.model('UserInteraction',userInteractionSchema);
export default UserInteraction;