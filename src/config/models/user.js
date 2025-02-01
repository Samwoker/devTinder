const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase:true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male","female"].includes(value)) {
        throw new Error("There is no such gender");
      }
    },
  },
  photoUrl: {
    type: String,
    default:
      "https://st2.depositphotos.com/1502311/12020/v/450/depositphotos_120206860-stock-illustration-profile-picture-vector.jpg",
  },
  about: {
    type: String,
    default: "this is about description",
  },
  skills:{
    type:[String]
  }
},{
  timestamps:true
});
module.exports = mongoose.model("User", userSchema);
