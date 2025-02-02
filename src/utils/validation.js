const validator = require("validator");

const validateSignUpApi = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("please enter the name");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("please enter the correct email address");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("please enter a Strong Password");
  }
};
const validateLoginApi = (req) => {
  const { emailId } = req.body;

  if (!validator.isEmail(emailId)) {
    throw new Error("please enter the correct email address");
  }
};

module.exports = {
  validateSignUpApi,
  validateLoginApi,
};
