const express = require("express");
const authRouter = express.Router();
const { validateSignUpApi, validateLoginApi } = require("../utils/validation");
const User = require("../config/models/user");
const bcrypt = require("bcrypt");
authRouter.post("/signup", async (req, res) => {
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
authRouter.post("/login", async (req, res) => {
  try {
    validateLoginApi(req);
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    } else {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      });
      res.send("Login Successful");
    }
  } catch (err) {
    res.status(400).send("no data sent " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .send("user logged out successfully");
});

module.exports = authRouter;
