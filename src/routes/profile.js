const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const {
  validateEditProfile,
  validateEditPassword,
} = require("../utils/validation");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("no data sent " + err.message);
  }
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfile(req)) {
      throw new Error("invalid user filed to edit profile");
    }
    const loggedInUser = req.user;
    console.log(loggedInUser);
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    console.log(loggedInUser);
    res.json({
      message: `${loggedInUser.firstName} profile updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("error: " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    if (!validateEditPassword(req)) {
      throw new Error("invalid password to edit password");
    }
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const loggedInUser = req.user;
    loggedInUser.password = hashedPassword;
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName} password updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("error: " + err.message);
  }
});

module.exports = profileRouter;
