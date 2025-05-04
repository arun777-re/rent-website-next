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
        min:6,
        max:10,
        validate:{
            validator:(values:string)=>{
                const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
                return strongPassword.test(values);
            },
            message:
            'Password must be at least 6 characters long and include an uppercase letter, lowercase letter, number, and special character.',
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

    userSchema.methods.comparePassword = async function (candidatePassword: string) {
        return bcrypt.compare(candidatePassword, this.password);
      };

const User = mongoose.models.User || mongoose.model('User',userSchema);

export default User;