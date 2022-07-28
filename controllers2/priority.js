/**
 * API Response Standard Format
 */
var RES = require("../helpers/utils").response;

/**
 * Importing Priority Database Model
 */
const Priority = require("./../models/priority");

/**
 * Importing Data Validator
 */
const { CheckIfEmpty } = require("./../helpers/utils");

/**
 * Importing Logs Helper
 */
const { logs } = require("./../helpers/logs");

/**
 * Method to Add a New Priority
 */
module.exports.create = async (req, res, next) => {
  if (CheckIfEmpty(req.body.name)) {
    var created = await Priority.create({ ...req.body });
    if (created) {
      logs("Priority", "New Priority Created");
      res.json(RES(200, "Priority Creation Success"));
    } else res.json(RES(403, "Priority Creation Failed"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Update a Specific Priority
 */
module.exports.update = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id) && CheckIfEmpty(req.body.name)) {
    var priority = await Priority.findOne({ where: { id: req.params.id } });
    if (priority) {
      priority.update({ ...req.body });
      logs("Priority", "Priority ( " + req.params.id + " ) Updated");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "No Data Matched"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Remove a Specific Priority
 */
module.exports.remove = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id)) {
    var priority = await Priority.destroy({ where: { id: req.params.id } });
    if (priority) {
      logs("Priority", "Priority ( " + req.params.id + " ) Deleted");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "Deletion Error"));
  } else res.json(RES(403, "Parameter Not Found"));
};

/**
 * Method to Fetch all Priority from the Database
 */
module.exports.fetchAll = async (req, res, next) => {
  var priority = await Priority.findAll();
  if (priority) {
    logs("Priority", "Fetched All");
    res.json(RES(200, "Success", priority));
  } else res.json(RES(403, "SQL Error"));
};
