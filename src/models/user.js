const mongoose = require("mongoose")
const validator = require('validator');
const userSchema = new  mongoose.Schema({
    firstName:{
        type: String,
        required:true,
        minLength:4,
        maxLength:50 
    },
      lastName:{
        type: String
    },
      emailId:{
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
          if(!validator.isEmail(value)){
            throw new Error("Invalid Email address" + value)
          }
        }
    },
      password:{
        type: String,
        validate(value){
          if(!validator.isStrongPassword(value)){
            throw new Error("Enter a strong password " + value)
          }
        },
        required:true
    },
      age:{
        type: Number,
        min:18
    },
      gender :{
        type: String,
        validate(value){
          if(!["Male","Female","Others"].includes(value)){
            throw new Error("Gender data is not valid")
          }
        }
    },
      photoUrl :{
        type: String,
         validate(value){
          if(!validator.isURL(value)){
            throw new Error("Invalid Photo  URL " + value)
          }
        },
        default:"https://i.sstatic.net/l60Hf.png"
    },
      about :{
        type: String,
        default:"This is a default about "
    },
      skills :{
        type: [String]
    }
},{timestamps:true})

const UserModel = mongoose.model("User",userSchema)

module.exports = UserModel