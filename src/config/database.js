const mongoose = require("mongoose")

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://root:root@cluster0.yckkfgk.mongodb.net/devSocialMedia ")
}


module.exports = connectDB
