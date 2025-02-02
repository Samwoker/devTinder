const express = require("express");
const app = express();
const User = require("./config/models/user");
const connectDB = require("./config/database");
const { validateSignUpApi, validateLoginApi } = require("./utils/validation");
const bcrypt = require("bcrypt");

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
  try {
    const { firstName, lastName, emailId, password } = req.body;
    validateSignUpApi(req);
    const passwordHash = await bcrypt.hash(password, 10);
    const user = User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("user signed up successfully");
  } catch (err) {
    res.status(400).send("no data sent" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    validateLoginApi(req);
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    }else{
         res.send("Login Successful");
    }
  } catch (err) {
    res.status(400).send("no data sent " + err.message);
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
    const ALLOWED_UPDATES = ["photoUrl", "about", "userId", "age", "gender"];
    const isAllowedUpdate = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isAllowedUpdate) {
      throw new Error("update not allowed");
    }
    if (req.body.skills.length > 10) {
      throw new Error("it's not allowed to add more than 10 skills ");
    }
    if (req.body.age < 18) {
      throw new Error("age must be less than 18");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators: true,
    });
    console.log(user);
    res.send("user updated successfully");
  } catch (err) {
    res.status(400).send("no data sent" + err.message);
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
