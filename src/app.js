const express = require("express");
const app = new express();
app.use("/",(req,res)=>{
    res.send("hello from the sever")
});
app.use("/test",(req,res)=>{
    res.send("hello from the sever test")
});
app.use("/home",(req,res)=>{
    res.send("hello1234 from the sever home")
});

app.listen(3000, () => {
  console.log("we are now starting");
});
