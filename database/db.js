require('dotenv').config();
const mongoose = require('mongoose');

const db = process.env.db;

module.exports.con = async () => {
  try {
    await mongoose.connect(`${db}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
