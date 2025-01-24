const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);
app.use("/user", userAuth, (req, res) => {
  res.send("getting user data");
});

app.post("/user/login",(req,res)=>{
  res.send("logging in");
})
app.get("/admin/getAllData", (req, res) => {
  res.send("getting all data");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("deleted user");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
