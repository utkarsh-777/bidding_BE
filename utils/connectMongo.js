const mongoose = require("mongoose");
const config = require("../config");
const { db } = config;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(db.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log("Mongo Error: ", error);
    console.error(error);
  }
};

module.exports = connectDB;
