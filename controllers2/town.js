/**
 * API Response Standard Format
 */
var RES = require("../helpers/utils").response;

/**
 * Importing Town Database Model
 */
const Town = require("./../models/town");

/**
 * Importing Data Validator
 */
const { CheckIfEmpty } = require("./../helpers/utils");

/**
 * Importing Logs Helper
 */
const { logs } = require("./../helpers/logs");

/**
 * Method to Add a New Town
 */
module.exports.create = async (req, res, next) => {
  if (CheckIfEmpty(req.body.name)) {
    var created = await Town.create({ ...req.body });
    if (created) {
      logs("Town", "New Town Created");
      res.json(RES(200, "Town Creation Success"));
    } else res.json(RES(403, "Town Creation Failed"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Update a Specific Town
 */
module.exports.update = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id) && CheckIfEmpty(req.body.name)) {
    var town = await Town.findOne({ where: { id: req.params.id } });
    if (town) {
      town.update({ ...req.body });
      logs("Town", "Town ( " + req.params.id + " ) Updated ");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "No Data Matched"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Remove a Specific Town
 */
module.exports.remove = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id)) {
    var town = await Town.destroy({ where: { id: req.params.id } });
    if (town) {
      logs("Town", " Town ( " + req.params.id + " ) Deleted ");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "Deletion Error"));
  } else res.json(RES(403, "Parameter Not Found"));
};

/**
 * Method to Fetch all Town from the Database
 */
module.exports.fetchAll = async (req, res, next) => {
  var town = await Town.findAll();
  if (town) {
    logs("Town", " All Towns Fetched ");
    res.json(RES(200, "Success", town));
  } else res.json(RES(403, "SQL Error"));
};

/**
 * Method to Fetch Specific Towns Against Particular City from the Database
 */
module.exports.cityFilter = async (req, res, next) => {
  if (CheckIfEmpty(req.body.id)) {
    var town = await Town.findAll({ where: { cityId: req.body.id } });
    if (town) {
      logs("Town", " All Town Fetched against a Specific City ");
      res.json(RES(200, "Success", town));
    } else res.json(RES(403, "SQL Error"));
  } else res.json(RES(403, "Credentials Error"));
};
