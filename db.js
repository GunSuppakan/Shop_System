const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
