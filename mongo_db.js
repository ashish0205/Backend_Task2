const mongoose = require("mongoose");
mongoDB =
  "mongodb+srv://admin:020593@cluster0.rrtec.mongodb.net/stock_market?retryWrites=true&w=majority";

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
module.exports = mongoose;
