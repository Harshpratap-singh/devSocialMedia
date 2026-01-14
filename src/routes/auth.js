const express = require("express")
const authRouter = express.Router()
const UserModel = require("../models/user");
const { validateSignUpData } = require("../utils/validations");
const bcrypt = require("bcrypt");


authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new UserModel({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("user added sucessfully");
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    console.log("req", req.body);
    const { emailId, password } = req.body;
    const user = await UserModel.findOne({ emailId: emailId });
    console.log("user", user.password);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    console.log("ispass", isPasswordValid);
    if (isPasswordValid) {
      const token = await user.getJWT()
      console.log("token", token);  
      res.cookie("token", token,{
        expires: new Date(Date.now()+8*3600000)
      });
      res.send("Login Successful!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

authRouter.post("/logout",async(req,res)=>{
res.cookie("token",null,{
    expires: new Date(Date.now())
})
res.send("Logout Successful!!!")
})

module.exports = authRouter