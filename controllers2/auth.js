/**
 * Importing API Response Standard Format
 */
var RES = require("../helpers/utils").response;

/**
 * Importing Role Database Model
 */
const Role = require("../models/role");

/**
 * Importing User Database Model
 */
const User = require("../models/user");

/**
 * Importing Json Web Token Library
 */
const jwt = require("jsonwebtoken");

/**
 * Importing Json Web Token Key
 */
const { KEY, Min } = require("../configs/jwt");

/**
 * Data Validator => Checks If Empty Or Null
 */
const { CheckIfEmpty } = require("./../helpers/utils");

/**
 * Importing Logs Helper
 */
const { logs } = require("./../helpers/logs");

/**
 * Importing Logs Helper
 */
const { ind } = require("./../helpers/fire");

/**
 * Method to Login Valid User & Generate Token for Authentication
 */
module.exports.login = async (req, res, next) => {
  var user = await User.findOne({
    where: {
      contact: req.body.contact,
      password: req.body.password,
    },
    include: Role,
  });
  if (user) {
    if (
      CheckIfEmpty(req.body.contact) &&
      CheckIfEmpty(req.body.password) &&
      CheckIfEmpty(req.body.deviceId)
    ) {
      if (user.roleId == 3 || user.roleId == 2 || user.roleId == 4) {
        user.userActivation = 1;
      }
      console.log("user ", user);
      // res.json(user);
      if (user != null) {
        const min = 10;
        user.deviceId = req.body.deviceId;
        user.userToken = null;
        user.userActivation = true;
        user.save();
        var token = await jwt.sign({ user: user }, KEY, {
          expiresIn: 60 * min,
        });
        // var token = await jwt.sign({ user: user }, KEY, { expiresIn: 60 * Min });
        if (token) {
          logs(
            "Login Authentication",
            "User with Contact ( " + req.body.contact + " ) Logged In"
          );
          res.json(RES(200, "Success", token));
        } else {
          res.json(RES(403, "JsonWebToken Decoding Error"));
        }
      } else {
        res.json(RES(403, "No User Matched"));
      }
    } else {
      res.json(RES(403, "Credentials Error"));
    }
  } else {
    res.json(RES(403, "Credentials Error"));
  }

  // if (
  //   CheckIfEmpty(req.body.contact) &&
  //   CheckIfEmpty(req.body.password) &&
  //   CheckIfEmpty(req.body.deviceId)
  // ) {
  //   var user = await User.findOne({
  //     where: {
  //       contact: req.body.contact,
  //       password: req.body.password,
  //     },
  //     include: Role,
  //   });
  //   if (user.roleId == 3 || user.roleId == 2 || user.roleId == 4) {
  //     user.userActivation = 1;
  //   }
  //   console.log("user ", user);
  //   // res.json(user);
  //   if (user != null) {
  //     const min = 10;
  //     user.deviceId = req.body.deviceId;
  //     user.userToken = null;
  //     user.userActivation = true;
  //     user.save();
  //     var token = await jwt.sign({ user: user }, KEY, { expiresIn: 60 * min });
  //     // var token = await jwt.sign({ user: user }, KEY, { expiresIn: 60 * Min });
  //     if (token) {
  //       logs(
  //         "Login Authentication",
  //         "User with Contact ( " + req.body.contact + " ) Logged In"
  //       );
  //       res.json(RES(200, "Success", token));
  //     } else {
  //       res.json(RES(403, "JsonWebToken Decoding Error"));
  //     }
  //   } else {
  //     res.json(RES(403, "No User Matched"));
  //   }
  // } else {
  //   res.json(RES(403, "Credentials Error"));
  // }
};

/**
 * Method to Login Valid User & Generate Token for Authentication using FcmToken
 */
module.exports.loginWithFcmToken = async (req, res, next) => {
  if (
    CheckIfEmpty(req.body.contact) &&
    CheckIfEmpty(req.body.password) &&
    CheckIfEmpty(req.body.deviceId) &&
    CheckIfEmpty(req.body.fcmToken)
  ) {
    var user = await User.findOne({
      where: {
        contact: req.body.contact,
        password: req.body.password,
      },
      include: Role,
    });
    if (user) {
      const min = 10;
      user.deviceId = req.body.deviceId;
      user.save();
      var token = user.userToken; // await jwt.sign({ user: user }, KEY, { expiresIn: 60 * min });
      // var token = await jwt.sign({ user: user }, KEY, { expiresIn: 60 * Min });
      if (token) {
        logs(
          "Login Authentication",
          "User with Contact ( " + req.body.contact + " ) Logged In"
        );
        res.json(RES(200, "Success", token));
      } else res.json(RES(403, "JsonWebToken Decoding Error"));
    } else res.json(RES(403, "No User Matched"));
  } else {
    res.json(RES(403, "Credentials Error"));
  }
};

/**
 * Forget Password
 */
module.exports.forgetPassword = async (req, res, next) => {
  if (CheckIfEmpty(req.body.contact) && CheckIfEmpty(req.body.email)) {
    var user = await User.findOne({
      where: {
        contact: req.body.contact,
      },
      include: Role,
    });
    if (user) {
      var newData = await jwt.sign(
        { contact: req.body.contact, email: req.body.email },
        KEY,
        {
          expiresIn: 60 * Min,
        }
      );
      user.forgetToken = newData;
      user.save();
      res.json(RES(200, "Success", newData));
    } else {
      res.json(RES(403, "Error"));
    }
  }
};

/**
 * Renew Password
 */
module.exports.renewPassword = async (req, res, next) => {
  if (CheckIfEmpty(req.body.token) && CheckIfEmpty(req.body.password)) {
    try {
      var { contact, email } = await jwt.verify(req.body.token, KEY);
      // res.json(req.body.token);
      var user = await User.findOne({
        where: {
          contact: contact,
        },
        include: Role,
      });
      if (user) {
        user.forgetToken = null;
        user.password = req.body.password;
        user.save();
        res.json(RES(200, "Success"));
      } else {
        res.json(RES(403, "User Not Found Error"));
      }
    } catch (err) {
      res.json(RES(403, "Token or Password Error", err));
    }
  } else {
    res.json(RES(403, "Error 2"));
  }
};

/**
 * Logging out Method ( for the Mobile Application )
 */
module.exports.logout = async (req, res, next) => {
  if (CheckIfEmpty(req.body.contact)) {
    var user = await User.findOne({
      where: {
        contact: req.body.contact,
      },
      include: Role,
    });
    // res.json(RES(200, "Success", user));
    if (
      user.roleId == 3 ||
      user.roleId == 2 ||
      user.roleId == 4 ||
      user.roleId == 5
    ) {
      user.userActivation = false;
    }
    if (user && user.userToken == req.body.token) {
      user.deviceId = null;
      user.fcmToken = null;
      user.userToken = null;
      user.save();
      res.json(RES(200, "Success", { user }));
    } else {
      res.json(RES(403, "Credentials Error"));
    }
  }
};

/**
 * Token Renewal
 */
module.exports.renewToken = async (req, res, next) => {
  var auth = req.body.token;
  if (CheckIfEmpty(req.body.contact)) {
    var user = await User.findOne({
      where: {
        contact: req.body.contact,
      },
      include: Role,
    });
    if (user) {
      var DateToday = new Date();
      var shouldExpire = new Date(user.subscriptionExpiry);
      // var shouldBeDate = new Date(date.setTime( date.getTime() + days * 86400000 ));
      if (DateToday.getDate() == shouldExpire.getDate()) {
        ind(
          user.fcmToken,
          "",
          "Your Subscription Expires Today. Service will be discontinued after Midnight Today",
          {},
          () => {
            user.subscriptionId = null;
            user.subscriptionExpiry = null;
            user.save();
          }
        );
      }
      if (user.block) {
        res.json(RES(403, "User Blocked. Please Contact the Management"));
      }
      if (user.userToken != null && auth == user.userToken) {
        user.userToken = null;
        user.deviceId = req.body.deviceId;
        user.save();
        const token = await jwt.sign({ user: user }, KEY, {
          expiresIn: 1000 * Min,
        });
        user.userToken = token;
        user.save();
        res.json(RES(200, "Success", token));
      } else {
        res.json(RES(403, "Token Error"));
      }
    } else res.json(RES(403, "Not Found Error"));
  } else {
    res.json(RES(403, "Credentials Error"));
  }
};

/**
 * Method to get Data with Login & Generate Token
 */
module.exports.loginData = async (req, res, next) => {
  if (CheckIfEmpty(req.body.contact) && CheckIfEmpty(req.body.password)) {
    var user = await User.findOne({
      where: {
        contact: req.body.contact,
        password: req.body.password,
      },
      include: Role,
    });
    if (user) {
      const min = 10;
      var DateToday = new Date();
      var shouldExpire = new Date(user.subscriptionExpiry);
      // var shouldBeDate = new Date(date.setTime( date.getTime() + days * 86400000 ));
      if (DateToday.getDate() == shouldExpire.getDate()) {
        ind(
          user.fcmToken,
          "",
          "Your Subscription Expires Today. Service will be discontinued after Midnight Today",
          {},
          () => {
            user.subscriptionId = null;
            user.subscriptionExpiry = null;
            user.save();
          }
        );
      }
      if (user.roleId == 6) {
        var user2 = await User.findOne({
          where: {
            id: user.custId,
          },
        });
        user.lat = user2.lat;
        user.lng = user2.lng;
        user.mapAddress = user2.mapAddress;
      }
      if (user.block) {
        res.json(RES(403, "User Blocked. Please Contact the Management"));
      }
      if (
        user.roleId == 3 ||
        user.roleId == 2 ||
        user.roleId == 4 ||
        user.roleId == 5
      ) {
        user.userActivation = 1;
      }
      if (user.deviceId == null || user.deviceId == req.body.deviceId) {
        user.deviceId = req.body.deviceId;
        user.fcmToken = req.body.fcm_token || "" || null;
        user.userToken = null;
        if (user.image == null) {
          user.image = "";
        }
        user.save();
        user.userToken = await jwt.sign({ user: user }, KEY, {
          expiresIn: 60 * min,
        });
        user.save();
        var token = user.userToken; // await jwt.sign({ user: user }, KEY, { expiresIn: 60 * min });
        // var token = await jwt.sign({ user: user }, KEY, { expiresIn: 60 * Min });
        if (token) {
          logs(
            "Login Authentication",
            "User with Contact ( " + req.body.contact + " ) Logged In"
          );
          res.json(RES(200, "Success", { user, token }));
        } else {
          res.json(RES(403, "Token Error"));
        }
      } else if (req.body.force == true) {
        var fcm = user.fcmToken || "" || null;
        user.userToken = null;
        user.fcmToken = req.body.fcm_token || null;
        user.save();
        user.userToken = await jwt.sign({ user: user }, KEY, {
          expiresIn: 60 * min,
        });
        user.save();
        var token = user.userToken; // await jwt.sign({ user: user }, KEY, { expiresIn: 60 * min });
        // var token = await jwt.sign({ user: user }, KEY, { expiresIn: 60 * Min });
        if (token) {
          logs(
            "Login Authentication",
            "User with Contact ( " + req.body.contact + " ) Logged In"
          );
          ind(
            fcm,
            "Force Logout",
            "This Device Has Been Forcefully Logged Out",
            {},
            (data) => {
              // user.userToken = null;
              // user.fcmToken = "";
              user.deviceId = req.body.deviceId;
              user.save();
            }
          );
          res.json(RES(200, "Forced Success", { user, token }));
        } else {
          res.json(RES(403, "Forced Token Error"));
        }
      } else {
        res.json(
          RES(112, "Account Already in Use Error", {
            user,
          })
        );
      }
    } else res.json(RES(403, "No User Matched"));
  } else {
    res.json(RES(403, "Credentials Error"));
  }
};

/**
 * Method to get Data with Login & Generate Token
 */
module.exports.loginDataResponder = async (req, res, next) => {
  if (CheckIfEmpty(req.body.contact) && CheckIfEmpty(req.body.password)) {
    var user = await User.findOne({
      where: {
        contact: req.body.contact,
        password: req.body.password,
      },
      include: Role,
    });
    if (user.roleId == 3 || user.roleId == 2 || user.roleId == 4) {
      user.userActivation = 1;
    }
    if (user) {
      const min = 10;
      user.fcmToken = req.body.fcmToken || null;
      user.save();
      user.userToken = await jwt.sign({ user: user }, KEY, {
        expiresIn: 60 * min,
      });
      user.save();
      res.json(RES(200, "Success", { user }));
    } else res.json(RES(403, "No User Matched"));
  } else {
    res.json(RES(403, "Credentials Error"));
  }
};

/**
 * Method to Verify a Number Via SMS
 */
module.exports.smsVerification = (req, res, next) => {};

/**
 * Method to Verify a E-mail
 */
module.exports.emailVerification = (req, res, next) => {
  var done = verifyViaEmail(req.body.email);
  res.json(RES(200, "Success", done));
};

/**
 * Method to Change Password
 */
module.exports.changePassword = (req, res, next) => {
  User.findOne({ where: { id: req.body.id, password: req.body.oldPassword } })
    .then((result) => {
      result.update({ password: req.body.newPassword });
      res.json(RES(403, "Password Accepted & Changed "));
    })
    .catch((e) => {
      res.json(RES(403, "Password Request / Verification Error"));
    });
};

/**
 * Method to Fetch a Specific Third Party  from the Database
 */
module.exports.filter = async (req, res, next) => {
  if (CheckIfEmpty(req.body.token)) {
    var user = await User.findOne({
      where: { custId: req.body.custId },
    });
    if (thirdParty) {
      logs(
        "Specific Third Party Fetched",
        "Fetching a Specific third party from the Database"
      );
      res.json(RES(200, "Success", thirdParty));
    } else res.json(RES(403, "No Data Matched Error"));
  } else res.json(RES(403, "Credentials Error"));
};
