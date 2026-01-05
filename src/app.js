const express = require("express");
const connectDB = require("./config/database");
const app = new express();
const { adminAuth, userAuth } = require("./middlewares/auth");
const UserModel = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new UserModel(req.body);
  try {
    await user.save();
    res.send("user added sucessfully");
  } catch (error) {
    res.status(400).send("error while saving data" + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("DB connection sucessfull");
    app.listen(3000, () => {
      console.log("we are now starting");
    });
  })
  .catch(() => {
    console.log("Error while connecting to db");
  });
