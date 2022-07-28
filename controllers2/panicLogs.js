/**
 * API Response Standard Format
 */
var RES = require("../helpers/utils").response;

/**
 * Importing Geofence Database Model
 */
const panicLogs = require("./../models/panicLogs");
const User = require("./../models/user");
const Panic = require("./../models/panic");

/**
 * Importing Data Validator
 */
const { CheckIfEmpty } = require("./../helpers/utils");

/**
 * Importing Logs Helper
 */
const { logs } = require("./../helpers/logs");

/**
 * Method to Fetch All Panic Logs
 */
module.exports.fetchAll = async (req, res, next) => {
  var log = await panicLogs.findAll({
    include: [Panic, User],
  });
  if (log) {
    logs("Panic Logs", "Fetched All");
    res.json(RES(200, "Success", log));
  } else res.json(RES(403, "SQL Error"));
};

/**
 * Method to Fetch All Panic Logs for a Specfic Panic
 */
module.exports.fetchAllAgainstPanic = async (req, res, next) => {
  var log = await panicLogs.findAll({
    where: { panicId: req.body.id },
  });
  if (log) {
    logs("Panic Logs", "Fetched All");
    res.json(RES(200, "Success", log));
  } else res.json(RES(403, "SQL Error"));
};

/**
 * Method to Fetch All Panic Logs for a Specfic Operator
 */
module.exports.fetchAllAgainstOperator = async (req, res, next) => {
  var log = await panicLogs.findAll({
    where: { operator: req.body.operatorInvolved },
  });
  if (log) {
    logs("Panic Logs", "Fetched All");
    res.json(RES(200, "Success", log));
  } else res.json(RES(403, "SQL Error"));
};

/**
 * Method to Fetch All Panic Logs for a Specfic Supervisor
 */
module.exports.fetchAllAgainstSupervisor = async (req, res, next) => {
  var log = await panicLogs.findAll({
    where: { supervisor: req.body.supervisorInvolved },
  });
  if (log) {
    logs("Panic Logs", "Fetched All");
    res.json(RES(200, "Success", log));
  } else res.json(RES(403, "SQL Error"));
};

/**
 * Method to Fetch All Panic Logs for a Specfic Responder
 */
module.exports.fetchAllAgainstResponder = async (req, res, next) => {
  var log = await panicLogs.findAll({
    where: { responder: req.body.responderInvolved },
  });
  if (log) {
    logs("Panic Logs", "Fetched All");
    res.json(RES(200, "Success", log));
  } else res.json(RES(403, "SQL Error"));
};
