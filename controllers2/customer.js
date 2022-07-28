/**
 * API Response Standard Format
 */
var RES = require("../helpers/utils").response;

/**
 * Importing User Database Model
 */
const User = require("./../models/user");

/**
 * Importing Data Validator
 */
const { CheckIfEmpty } = require("./../helpers/utils");

/**
 * Importing Logging Helper
 */
const { logs } = require("./../helpers/logs");

/**
 * Method to Fetch all Customer from the Database
 */
module.exports.fetchAll = async (req, res, next) => {
  var user = await User.findAll({ where: { roleId: 5 } });
  if (user) {
    logs("Customer Fetched", "Fetch All the Customers from the Database");
    res.json(RES(200, "Success", user));
  } else res.json(RES(403, "SQL Error"));
};

/**
 * Method to Fetch a Specific Customer from the Database
 */
module.exports.filter = async (req, res, next) => {
  if (CheckIfEmpty(req.body.id)) {
    var user = await User.findOne({ where: { id: req.body.id, roleId: 5 } });
    if (user) {
      logs(
        "Specific Customer Fetched",
        "Fetching a Specific the Customer from the Database"
      );
      res.json(RES(200, "Success", user));
    } else res.json(RES(403, "No Data Matched Error"));
  } else res.json(RES(403, "Credentials Error"));
};
