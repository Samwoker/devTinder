const express = require("express");
const app = express();

app.get(
  "/user",
  (req, res, next) => {
    console.log("handler 1");
    // res.send("Handle Route 1");
    next();
  },
  (req, res, next) => {
    console.log("handler 2");
    next();
    // res.send("Handle Route 2");
  },
  (req, res, next) => {
    console.log("handler 3");
    res.send("Handle Route 3");
    // next();
  },
  (req, res) => {
    console.log("Final handler");
    res.send("Final handler");
  }
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
