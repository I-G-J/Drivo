const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const userSchema= new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minLength:[3,"First name Must be at least 3 Characters long"]
        },
        lastname:{
            type:String,
            minLength:[3,"Last name Must be at least 3 Characters long"]
        }
    },
    email:{
        type:String,
        minLength:7,
        required:true,
        unique:true,
        minLength:[5,"Last name Must be at least 3 Characters long"]

    },
    password:{
        type:String,
        required:true,
        Select:false,
        min:[8,"Password must be of more than 8 characters"]
    },
    sockedId:{
        type:String,
    },
})

userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({ _id:this._id},process.env.JWT_SECERET,{
        expiresIn:'24h'
    });
    return token
}
userSchema.methods.comparePassword= async function(password){

    return await bcrypt.compare(password,this.password)
}
userSchema.statics.hashPassword= async function(passowrd) {
    return await bcrypt.hash(passowrd,10);
    
}
const userModel=mongoose.model('user',userSchema)
module.exports=userModel;