/**
 * API Response Standard Format
 */
var RES = require("../helpers/utils").response;

/**
 * Importing Nature Database Model
 */
const Nature = require("./../models/nature");

/**
 * Importing Data Validator
 */
const { CheckIfEmpty } = require("./../helpers/utils");

/**
 * Importing Logs Helper
 */
const { logs } = require("./../helpers/logs");

/**
 * Method to Add a New Nature
 */
module.exports.create = async (req, res, next) => {
  if (CheckIfEmpty(req.body.name)) {
    var created = await Nature.create({ ...req.body });
    if (created) {
      logs("Nature", "New Nature Created");
      res.json(RES(200, "Nature Creation Success"));
    } else res.json(RES(403, "Nature Creation Failed"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Update a Specific Nature
 */
module.exports.update = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id) && CheckIfEmpty(req.body.name)) {
    var nature = await Nature.findOne({ where: { id: req.params.id } });
    if (nature) {
      nature.update({ ...req.body });
      logs("Nature", "Nature ( " + req.params.id + " ) Updated");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "No Data Matched"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Remove a Specific Nature
 */
module.exports.remove = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id)) {
    var nature = await Nature.destroy({ where: { id: req.params.id } });
    if (nature) {
      logs("Nature", "Nature ( " + req.params.id + " ) Deleted");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "Deletion Error"));
  } else res.json(RES(403, "Parameter Not Found"));
};

/**
 * Method to Fetch all Nature from the Database
 */
module.exports.fetchAll = async (req, res, next) => {
  var nature = await Nature.findAll();
  if (nature) {
    logs("Nature", "Fetched All");
    res.json(RES(200, "Success", nature));
  } else res.json(RES(403, "SQL Error"));
};
