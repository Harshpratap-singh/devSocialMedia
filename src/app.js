const express = require("express");
const bcrypt = require("bcrypt");
const connectDB = require("./config/database");
const app = new express();
const { adminAuth, userAuth } = require("./middlewares/auth");
const UserModel = require("./models/user");
const { validateSignUpData } = require("./utils/validations");
app.use(express.json());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    console.log("req",req.body)
    const { emailId, password } = req.body;
    const user = await UserModel.findOne({ emailId: emailId });
    console.log("user", user.password);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("ispass", isPasswordValid);
    if (isPasswordValid) {
      res.send("Login Successful!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

app.get("/user", async (req, res) => {
  let userEmail = req.body.emailId;
  console.log("user", userEmail);
  try {
    let result = await UserModel.find({ emailId: userEmail });
    if (result.length === 0) res.status(404).send("User not Found");
    else {
      res.send(result);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  let userId = req.params.userId;
  let body = req.body;

  try {
    const ALLOWED_UPDATES = [
      "firstName",
      "lastName",
      "password",
      "gender",
      "photoUrl",
      "skills",
      "about",
    ];

    const isUpdateAllowed = Object.keys(body).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not Allowed");
    }

    if (body?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10 ");
    }
    let result = await UserModel.findByIdAndUpdate({ _id: userId }, body, {
      runValidators: true,
    });
    res.send("User updated sucessfully");
  } catch (err) {
    console.log("err.message", err.message);
    res.status(400).send("Update Failed:" + err.message);
  }
});
app.delete("/user", async (req, res) => {
  let userId = req.body.userId;
  try {
    let result = await UserModel.findByIdAndDelete({ _id: userId });
    res.send("User deleted successfully");
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    let result = await UserModel.find({});
    if (result.length === 0) res.status(404).send("User not Found");
    else {
      res.send(result);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
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
