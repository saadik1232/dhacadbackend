/**
 * API Response Standard Format
 */
var RES = require("../helpers/utils").response;

/**
 * Importing Status Database Model
 */
const Status = require("./../models/status");

/**
 * Importing Data Validator
 */
const { CheckIfEmpty } = require("./../helpers/utils");

/**
 * Importing Logs Helper
 */
const { logs } = require("./../helpers/logs");

/**
 * Method to Add a New Status
 */
module.exports.create = async (req, res, next) => {
  if (CheckIfEmpty(req.body.name)) {
    var created = await Status.create({ ...req.body });
    if (created) {
      logs("Status", "New Status Created");
      res.json(RES(200, "Status Creation Success"));
    } else res.json(RES(403, "Status Creation Failed"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Update a Specific Status
 */
module.exports.update = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id) && CheckIfEmpty(req.body.name)) {
    var status = await Status.findOne({ where: { id: req.params.id } });
    if (status) {
      status.update({ ...req.body });
      logs("Status", "Status ( " + req.params.id + ") Updated");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "No Data Matched"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Remove a Specific Status
 */
module.exports.remove = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id)) {
    var status = await Status.destroy({ where: { id: req.params.id } });
    if (status) {
      logs("Status", "Status ( " + req.params.id + " ) Deleted ");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "Deletion Error"));
  } else res.json(RES(403, "Parameter Not Found"));
};

/**
 * Method to Fetch all Status from the Database
 */
module.exports.fetchAll = async (req, res, next) => {
  var status = await Status.findAll();
  if (status) {
    logs("Status", "Status Fetched");
    res.json(RES(200, "Success", status));
  } else res.json(RES(403, "SQL Error"));
};
