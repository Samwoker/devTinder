const express = require("express");
const app = express();

app.use("/",(req,res)=>{
    res.send("everything starts here");
})
app.use("/test", (req, res) => {
  res.send("Hello World");
});
app.use("/namaste", (req, res) => {
  res.send("namaste World");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
