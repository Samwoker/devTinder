const express = require("express");
const app = express();
const User = require("./config/models/user");
const connectDB = require("./config/database");

app.use(express.json());

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("no user found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.post("/signup", async (req, res) => {
  const user = User(req.body);
  try {
    await user.save();
    res.send("user signed up successfully");
  } catch (err) {
    res.status(400).send("no data sent");
  }
});
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete({ _id: userId });
    // await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (err) {
    res.status(400).send("no data sent");
  }
});
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
    });
    console.log(user);
    res.send("user updated successfully");
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
