const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const app = new express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);



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
