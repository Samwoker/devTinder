const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");

app.get("/getUserData", (req, res) => {
  try{
    throw new Error("Not implemented");
    res.send("getting user data");
  }catch(err){
   res.status(500).send("some error contact support team");
  }
 
});
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
