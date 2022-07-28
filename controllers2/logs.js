/**
 * API Response Standard Format
 */
var RES = require("../helpers/utils").response;

/**
 * Importing Nature Database Model
 */
const Log = require("./../models/log");

/**
 * Importing Data Validator
 */
const { CheckIfEmpty } = require("./../helpers/utils");

/**
 * Importing Logs Helper
 */
const { logs } = require("./../helpers/logs");

/**
 * Method to Fetch all Nature from the Database
 */
module.exports.fetchAll = async (req, res, next) => {
  var log = await Log.findAll();
  if (log) {
    logs("Logs", "Logs Checked Or Viewed");
    res.json(RES(200, "Success", log));
  } else res.json(RES(403, "SQL Error"));
};

module.exports.customerFilter = async (req, res, next) => {
  if (CheckIfEmpty(req.body.id)) {
    var log = await Log.findAll({
      where: { user: req.body.id },
    });
    if (log) {
      // logs("Specific Log Fetched", "Fetching a Specific Log from the Database");
      res.json(RES(200, "Success", log));
    } else res.json(RES(403, "No Data Matched Error"));
  } else res.json(RES(403, "Credentials Error"));
};
