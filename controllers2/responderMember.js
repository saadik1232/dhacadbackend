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
 * Method to Fetch all Responder Member from the Database
 */
module.exports.fetchAll = async (req, res, next) => {
  var user = await User.findAll({ where: { roleId: 8 } });
  if (user) {
    logs("Responder Member", "Fetched All");
    res.json(RES(200, "Success", user));
  } else res.json(RES(403, "SQL Error"));
};

/**
 * Method to Fetch a Specific Responder Member from the Database
 */
module.exports.filter = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id)) {
    var user = await User.findOne({ where: { id: req.params.id, roleId: 8 } });
    if (user) {
      logs(
        " Specific Responder Member Fetched ",
        "Fetching a Specific Responder Member from the Database"
      );
      res.json(RES(200, "Success", user));
    } else res.json(RES(403, "No Data Matched Error"));
  } else res.json(RES(403, "Credentials Error"));
};
