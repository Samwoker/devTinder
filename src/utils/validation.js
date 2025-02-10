const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
const validateEditProfile = (req) => {
  const allowedEditField = [
    "firstName",
    "lastName",
    "emailId",
    "about",
    "skills",
    "age",
    "gender",
    "photoUrl",
  ];
  const isEditValid = Object.keys(req.body).every((field) =>
    allowedEditField.includes(field)
  );
  return isEditValid;
};

const validateEditPassword =async (req)=>{
  const password = req.body.password;
  if(!password){
    throw new Error("Password is required");
  }
  if(!validator.isStrongPassword(password)){
    throw new Error("Password should be strong");
  }
}
module.exports = {
  validateSignUpApi,
  validateLoginApi,
  validateEditProfile,
  validateEditPassword,
};
