/**
 * API Response Standard Format
 */
var RES = require("../helpers/utils").response;

/**
 * Importing City Database Model
 */
const City = require("./../models/city");

/**
 * Importing Town Database Model
 */
const Town = require("./../models/town");

/**
 * Importing Data Validator
 */
const { CheckIfEmpty } = require("./../helpers/utils");

/**
 * Importing Logging Helper
 */
const { logs } = require("./../helpers/logs");

/**
 * Method to Add a New City
 */
module.exports.create = async (req, res, next) => {
  if (CheckIfEmpty(req.body.name)) {
    var created = await City.create({ ...req.body });
    if (created) {
      logs(
        "New City Created",
        "New City Named ( " + req.body.name + " ) Created"
      );
      res.json(RES(200, "City Creation Success"));
    } else res.json(RES(403, "City Creation Failed"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Update a Specific City
 */
module.exports.update = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id) && CheckIfEmpty(req.body.name)) {
    var city = await City.findOne({ where: { id: req.params.id } });
    if (city) {
      city.update({ ...req.body });
      logs("City Updated", "City Named ( " + req.body.name + " ) Updated");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "No Data Matched"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Remove a Specific City
 */
module.exports.remove = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id)) {
    var city = await City.destroy({ where: { id: req.params.id } });
    if (city) {
      logs("City Deleted", "City ( id = " + req.params.id + " ) Deleted");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "Deletion Error"));
  } else res.json(RES(403, "Parameter Not Found"));
};

/**
 * Method to Fetch a Specific City from the Database
 */
module.exports.fetchSpecific = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id)) {
    var city = await City.findOne({ where: { id: req.params.id } });
    if (city) {
      logs(
        "Specific City Fetched",
        "City Named ( " + city.name + " ) was Fetched"
      );
      res.json(RES(200, "Success", city));
    } else res.json(RES(403, "SQL Error"));
  } else res.json(RES(403, "Credential Error"));
};

/**
 * Method to Fetch a Specific City from the Database with Related Towns
 */
module.exports.fetchSpecificWithTowns = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id)) {
    var city = await City.findOne({
      where: { id: req.params.id },
      include: Town,
    });
    if (city) {
      logs(
        "Specific City Fetched with Relative Towns",
        "City Named ( " + city.name + " ) Fetched with its Relative Towns"
      );
      res.json(RES(200, "Success", city));
    } else res.json(RES(403, "SQL Error"));
  } else res.json(RES(403, "Credential Error"));
};

/**
 * Method to Fetch all City from the Database
 */
module.exports.fetchAll = async (req, res, next) => {
  var city = await City.findAll({ include: Town });
  if (city) {
    logs("Cities Fetched", "All Cities Fetched");
    res.json(RES(200, "Success", city));
  } else res.json(RES(403, "SQL Error"));
};

/**
 * Method to Fetch all City from the Database with Related Towns
 */
module.exports.fetchAllWithTowns = async (req, res, next) => {
  var city = await City.findAll({ include: Town });
  if (city) {
    logs("Cities with Towns", "All Cities Fetched with All Relative Towns");
    res.json(RES(200, "Success", city));
  } else res.json(RES(403, "SQL Error"));
};
