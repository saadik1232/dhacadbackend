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
 * Importing Logs Helper
 */
const { logs } = require("./../helpers/logs");

/**
 * Method to Fetch all Customer Family from the Database
 */
module.exports.fetchAll = async (req, res, next) => {
  var user = await User.findAll({ where: { roleId: 6 } });
  if (user) {
    logs(
      "Customer Family Fetched",
      "Fetch All the Customer Family from the Database"
    );
    res.json(RES(200, "Success", user));
  } else res.json(RES(403, "SQL Error"));
};

/**
 * Method to Fetch a Specific Customer Family from the Database
 */
module.exports.filter = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id)) {
    var user = await User.findOne({ where: { id: req.params.id, roleId: 6 } });
    if (user) {
      logs(
        "Specific Customer Family Fetched",
        "Fetching a Specific Customer Family from the Database"
      );
      res.json(RES(200, "Success", user));
    } else res.json(RES(403, "No Data Matched Error"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Fetch Specific Customer Family Against Particular Customer from the Database
 */
module.exports.customerFamilyFilter = async (req, res, next) => {
  if (CheckIfEmpty(req.body.id)) {
    var custFamily = await User.findAll({
      where: { custId: req.body.id, roleId: 6 },
    });
    if (custFamily) {
      logs(
        "Customer Family",
        "All Customer Family Fetched against a Specific Customer "
      );
      res.json(RES(200, "Success", custFamily));
    } else res.json(RES(403, "SQL Error"));
  } else res.json(RES(403, "Credentials Error"));
};
