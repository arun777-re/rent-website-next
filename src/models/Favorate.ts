import mongoose, { Types } from 'mongoose';
import { ref } from 'yup';

const favorateSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    propertyId:{type:mongoose.Schema.Types.ObjectId,ref:"Property"}
},{timestamps:true});

const Favorite = mongoose.models.Favorate || mongoose.model('Favorate',favorateSchema);


export default Favorite;