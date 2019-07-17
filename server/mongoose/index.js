const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DB_URL = "mongodb://root:qwerty@localhost:27017/DB_BOOKS";

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
}, (err) => {
  if (!err) {
    console.log("MongoDB connection succeeded.");
  } else {
    console.log("MongoDB connection failed: " + err);
  }
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connection connected.");
});

mongoose.connection.on("error", () => {
  console.log("MongoDB connection error.");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB connection disconnected.");
});

module.exports = mongoose