const mongoose = require("../mongo_db");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const user_schema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_Name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
    maxLength: 16,
  },
  wallet: {
    type: Number,
    default: 500,
  },
  share: {
    type: Number,
    default: 20,
  },
  status: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
});

user_schema.pre("save", function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

user_schema.statics.authenticate = function (email_input, password, callback) {
  User.findOne({ email: email_input }, { token: false, _id: false }).exec(
    function (err, user) {
      if (err) {
        return callback(err);
      } else if (!user) {
        var err = new Error("User not Found");
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          const { password, ...filteredObject } = user;
          console.log(filteredObject);
          return callback(null, user);
        } else {
          return callback("custom error");
        }
      });
    }
  );
};

const User = mongoose.model("Users", user_schema);
module.exports = User;
