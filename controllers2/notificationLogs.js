/**
 * API Response Standard Format
 */
var RES = require("../helpers/utils").response;

/**
 * Importing Geofence Database Model
 */
const notifcationLogs = require("./../models/notificationLogs");

/**
 * Importing Data Validator
 */
const { CheckIfEmpty } = require("./../helpers/utils");

/**
 * Importing Logs Helper
 */
const { logs } = require("./../helpers/logs");

/**
 * Method to Add a Geofence
 */
module.exports.fetchAll = async (req, res, next) => {
  var log = await notifcationLogs.findAll();
  if (log) {
    logs("Notification Logs", "Fetched All");
    res.json(RES(200, "Success", log));
  } else res.json(RES(403, "SQL Error"));
};

/**
 * Method to Fetch All Notification Logs for a Specfic Customer
 */
module.exports.fetchAllAgainstCustomer = async (req, res, next) => {
  var log = await notifcationLogs.findAll({
    where: { recieveUserId: req.body.customerId },
  });
  if (log) {
    // logs("Panic Logs", "Fetched All");
    res.json(RES(200, "Success", log));
  } else res.json(RES(403, "SQL Error"));
};
