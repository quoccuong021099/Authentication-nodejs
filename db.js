const mongoose = require('mongoose');

const connectDB = async () => {
  const conStr = 'mongodb://localhost:27017/authentication';
  const conn = await mongoose.connect(conStr);
  console.log(`DB connection successful: ${conn.connection.host}`);
};

module.exports = connectDB;
