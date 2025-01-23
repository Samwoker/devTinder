const express = require("express");
const app = express();

app.use("/user",(req,res)=>{
  res.send("i dominate everything");
})
app.get("/user",(req,res)=>{
  res.send({firstName: "John", lastName: "Doe"});
})
app.post("/user",(req,res)=>{
  res.send("user created successfully");
})
app.delete("/user",(req,res)=>{
  res.send("user deleted successfully");
})
app.patch("/user",(req,res)=>{
  res.send("user updated successfully");
})
app.use("/test", (req, res) => {
  res.send("testing the test route");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
