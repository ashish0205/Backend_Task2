const User = require("../models/user");
const crypto = require('crypto');

exports.login = function (req, res, next) {
  let body = req.body;
  var responseData = { message: '', results: [], status: 0 }

  let email_input = body.email;
  let password = body.password;
  new Promise(function (resolve, reject) {
    _this = req;
    _that = res;

    User.authenticate(email_input, password, function (error, user) {
      if (error || !user) {
        responseData.message = 'Wrong email or password.';
        responseData.status = 401;
        reject(responseData);
      } else {
        responseData.results = user;
        responseData.first_name = user.first_name;
        responseData.last_name = user.last_Name;
        responseData.email = user.email;
        responseData.phone = user.phone;
        responseData.status = 1;
        responseData.message_body = "User has been logged in successfully";
        resolve(responseData)
      }
    });
  }).then((responseData) => {
    res.status(200).send(responseData);
  }).catch((err) => {
    res.status(400).send({
      "error": err
    });
  })

}

exports.signup = function (req, res) {
  let body = req.body;
  var responseData = {
    message: "user can not save",
    results: [],
    status: 0
  }
  let firstname = body.firstname;
  let lastname = body.lastname;
  let email = body.email;
  let password = body.password;
  let phone = body.phone;


  new Promise(function (resolve, reject) {

    var hash = crypto.createHash('md5').update(email).digest('hex');
    let userData = {
      'first_name': firstname,
      'last_Name': lastname,
      'phone': phone,
      'email': email,
      'password': password,
      'status': 0,
      'token': hash
    };
    User.create(userData, function (err, result) {
      if (err) {
        reject(err);

      }
      else {
        resolve(result);
      }
    });
  }).then((body) => {
    User.find({ 'email': body.email }, { _id: false, password: false }, function (err, result) {
      if (!err) {
        console.log("Incoming inputs => email =>", body.email);
      }

      responseData.message = "user has been saved successfully";
      responseData.results = result;
      responseData.status = 1;
      res.send(responseData);
    });
  }).catch((err) => {
    responseData.message = err;
    res.send(responseData);
  })
}
