const jwt = require("jsonwebtoken");
const User = require("../config/models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("The token is not valid!!!!!");
    }
    const decodedObj = await jwt.verify(token, "DEV@Tinder$790", {
      expiresIn: "7d",
    });
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("The user is not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};
module.exports = {
  userAuth,
};
