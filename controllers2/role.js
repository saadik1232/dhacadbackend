/**
 * API Response Standard Format
 */
var RES = require("../helpers/utils").response;

/**
 * Importing Role Database Model
 */
const Role = require("./../models/role");

/**
 * Importing Data Validator
 */
const { CheckIfEmpty } = require("./../helpers/utils");

/**
 * Importing Logs Helper
 */
const { logs } = require("./../helpers/logs");

/**
 * Method to Add a New Role
 */
module.exports.create = async (req, res, next) => {
  if (CheckIfEmpty(req.body.name)) {
    var created = await Role.create({ ...req.body });
    if (created) {
      logs("Role", "New Role Created");
      res.json(RES(200, "Role Creation Success"));
    } else res.json(RES(403, "Role Creation Failed"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Update a Specific Role
 */
module.exports.update = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id) && CheckIfEmpty(req.body.name)) {
    var role = await Role.findOne({ where: { id: req.params.id } });
    if (role) {
      role.update({ ...req.body });
      logs("Role", "Role ( " + req.params.id + " ) Updated");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "No Data Matched"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Remove a Specific Role
 */
module.exports.remove = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id)) {
    var role = await Role.destroy({ where: { id: req.params.id } });
    if (role) {
      logs("Role", "Role ( " + req.params.id + " ) Deleted");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "Deletion Error"));
  } else res.json(RES(403, "Parameter Not Found"));
};

/**
 * Method to Fetch all Role from the Database
 */
module.exports.fetchAll = async (req, res, next) => {
  var role = await Role.findAll();
  if (role) {
    logs("Role", "Fetched All");
    res.json(RES(200, "Success", role));
  } else res.json(RES(403, "SQL Error"));
};

/**
 * Method to Fetch One Role from the Database
 */
module.exports.fetchOne = async (req, res, next) => {
  var role = await Role.findOne({ where: { id: req.params.id } });
  if (role) res.json(RES(200, "Success", role));
  else res.json(RES(403, "SQL Error"));
};
