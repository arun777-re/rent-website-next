import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{type:String,required:true},
    message:{type:String,required:true},
    isRead:{type:Boolean,default:false},
    type:{type:String,default:'info'}
},{timestamps:true});


const Notification = mongoose.models.Notify || mongoose.model('Notify',notificationSchema);

export default Notification;