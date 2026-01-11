const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const userAuth = async (req, res, next) => {
  try { 
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid  Token");
    }
    const decodedMessage = await jwt.verify(token, "Dev@Harsh$123");
    const { _id } = decodedMessage;
    const user = await UserModel.findById(_id);
    if (!user) {
      throw new Error("User does not exist");
    }
    req.user=user
    next();
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
};

module.exports = { userAuth };
