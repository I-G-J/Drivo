const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
             type:String,
             required:true,
             minlength:[3,'First name must be of at least 3 characters'],

        },
        lastname:{
            type:String,
            //  required:true,
             minlength:[3,'Lastt name must be of at least 3 characters'],
            
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [ /^\S+@\S+\.\S+$/, 'Please enter a valid email' ]

    },
    password:{
        type: String,
        required:true,
        select:false,
    },
    sockedId:{

    },
    status:{
      type:String,
      enum:['active', 'inactive'],
      default:'inactive'
    },
    vehicle:{
         color:{
            type:String,
            required:true,
            minlength:[3,'Color must be of 3 characters Long']
         },
         plate:{
            type:String,
            required:true,
            minlength:[3,'plate must be of 3 characters Long']
         },
         capacity:{
            type:Number,
            required:true,
            minlength:[1,'There should a mininmum capacity of 1']



         },
         vehicleType :{
            type:String,
            required:true,
            enum:['car','motorcycle','auto'],

         },
         location:{
            lat:{
                type:Number,
                // required:true,

            },
            lng:{
                type:Number,
            }
         }
    }
})


captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECERET, { expiresIn: '24h' });
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}


const captainModel= mongoose.model('captain',captainSchema)

module.exports=captainModel