const User = require("../models/user");
const SHARE_VALUE = 20; //$20 PER SHARE
exports.getWallet = function (req, response, next) {
  let query = req.query;
  let userId = query.uId;
  findWallet(userId).then((responseData) => {
    response.status(200).send(responseData);

  }).catch((err) => {
    response.status(400).send(err);
  })
}

function findWallet(userId) {
  var responseData = { message: '', results: [], status: 0 }
  return new Promise(function (resolve, reject) {
    User.findOne({ _id: userId }, { password: false, toke: false }, function (err, result) {
      if (err) {
        responseData.message = 'No User has been found. Please try again.';
        responseData.status = 401;
        responseData.results = err;
        reject(responseData);
      }
      else {
        responseData.message = 'User has been found successfully.';
        responseData.status = 200;
        responseData.results = result;
        resolve(responseData);
      }
    })
  })
}


exports.addWallet = function (req, response, next) {
  let body = req.body;
  let userId = body.uId;
  let wallet = body.wallet;
  var responseData = { message: '', results: [], status: 0 }
  if (userId != undefined && wallet != undefined) {
    findWallet(userId).then((responseData) => {
      let currentWallet = parseFloat(responseData.results.wallet);
      let updatedWallet = currentWallet + parseFloat(wallet);
      walletUpdate(userId, updatedWallet, 0, false).then((responseData) => {
        response.status(200).send(responseData);
      }).catch((err) => {
        response.status(400).send(err);
      })
    }).catch((err) => {
      response.status(400).send(err);
    })
  } else {
    responseData.message = 'Something went wrong. Please try again.';
    responseData.status = 401;
    response.status(400).send(responseData);
  }
}

function walletUpdate(userId, wallet, share, isShareUpdate) {
  return new Promise(function (resolve, reject) {
    User.findOne({ _id: userId }, function (err, result) {
      if (err) {
        responseData.message = 'No User has been found. Please try again.';
        responseData.status = 401;
        responseData.results = err;
        reject(responseData);
      }
      else {
        resolve(result);
      }
    })
  }).then((responseData) => {
    return new Promise(function (resolve, reject) {
      let walletValueUpdate = {
        $set: {
          wallet: wallet
        }
      }
      if (isShareUpdate) {
        walletValueUpdate.$set.share = share;
      }
      User.findOneAndUpdate({ _id: userId }, walletValueUpdate, { new: true }, function (err, result) {
        if (err) {
          responseData.message = 'No User has been found. Please try again.';
          responseData.status = 401;
          responseData.results = err;
          reject(responseData);
        }
        else {
          responseData.message = 'Wallet has been updated successfully.';
          responseData.status = 200;
          responseData.results = result;
          resolve(responseData);
        }
      })
    })

  })
}


exports.buyAndsell = function (req, response, next) {
  let body = req.body;
  let buyer = body.buyer;
  let seller = body.seller;
  let share = body.share;
  var responseData = { message: '', results: [], status: 0 }
  if (seller != undefined && buyer != undefined && share != undefined) {
    findWallet(seller).then((responseData) => {
      let currentWallet = parseFloat(responseData.results.wallet);
      let updatedWallet = currentWallet + (parseFloat(share) * SHARE_VALUE);
      let currentShare = parseFloat(responseData.results.share);
      let updatedShare = currentShare + parseFloat(share);
      walletUpdate(seller, updatedWallet, updatedShare, true).then((responseData) => {
        findWallet(buyer).then((responseData) => {
          let currentWallet = parseFloat(responseData.results.wallet);
          let updatedWallet = currentWallet - (parseFloat(share) * SHARE_VALUE);
          let currentShare = parseFloat(responseData.results.share);
          let updatedShare = currentShare - parseFloat(share);
          walletUpdate(buyer, updatedWallet, updatedShare, true).then((responseData) => {
            response.status(200).send(responseData);
          }).catch((err) => {
            response.status(400).send(err);
          })

        }).catch((err) => {
          response.status(400).send(err);
        })
      }).catch((err) => {

        response.status(400).send(err);
      })


    }).catch((err) => {
      response.status(400).send(err);
    })

  } else {
    responseData.message = 'Something went wrong. Please try again.';
    responseData.status = 401;
    response.status(400).send(responseData);
  }
}