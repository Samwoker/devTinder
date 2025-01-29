const express = require("express");
const app = express();
const User = require("./config/models/user");
const connectDB = require("./config/database");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = User(req.body);
  try {
    await user.save();
    res.send("user signed up successfully");
  } catch (err) {
    res.status(400).send("no data sent");
  }
});

connectDB()
  .then(() => {
    console.log("database connection established...");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("database connection error");
  });
