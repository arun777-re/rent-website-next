import mongoose from 'mongoose';

const favorateSchema = new mongoose.Schema({
    favorateType:{
       type:String,
       enum:["booking","liked"],
       default:"liked",
       required:true
    },
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    propertyId:{type:mongoose.Schema.Types.ObjectId,ref:"Property"}
},{timestamps:true});

const Favorite = mongoose.models.Favorate || mongoose.model('Favorate',favorateSchema);

export default Favorite;