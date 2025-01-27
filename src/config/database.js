const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://samwoker112:ok3nKHU1hYTG57FA@namastenode.edskb.mongodb.net/devTinder"
  );
};

module.exports = connectDB;

