const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Instead of exiting, we will log it. In Render, we want the app to keep trying to spin up, or let Render handle health check failures gracefully.
    throw error;
  }
};

module.exports = connectDB;
