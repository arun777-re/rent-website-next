import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        unique:false
    },
    lastName:{
        type:String,
        required:true,
        unique:false
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        validate:{
            validator:(values:string)=>{
                const passmatch = /^([A-Za-z0-9@#$%*]){6,}$/
                return passmatch.test(values)
            }
        }
    },
    isActive:{
        type:Boolean,
        default:"false"
    },
    phone:{
        type:Number,
        required:true,
        unique:false
    }
},{timestamps:true});

    userSchema.pre('save', async function (next) {
        if (!this.isModified('password')) return next();
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    });

userSchema.methods.comparePass = async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
  };

const User = mongoose.models.User || mongoose.model('User',userSchema);

export default User;