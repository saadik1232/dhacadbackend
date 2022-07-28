/**
 * API Response Standard Format
 */
var RES = require("../helpers/utils").response;

/**
 * Importing Nature Database Model
 */
const Thirdparty = require("./../models/thirdParty");

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
  if (CheckIfEmpty(req.body.code)) {
    var created = await Thirdparty.create({ ...req.body });
    if (created) {
      logs("Nature", "New ThirdParty Device Created");
      res.json(RES(200, "Third Party Device Creation Success"));
    } else res.json(RES(403, "Third Party Device Creation Failed"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Update a Specific Nature
 */
module.exports.update = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id) && CheckIfEmpty(req.body.code)) {
    var thirdParty = await Thirdparty.findOne({ where: { id: req.params.id } });
    if (thirdParty) {
      thirdParty.update({ ...req.body });
      logs("Third Party", "Third Party ( " + req.params.id + " ) Updated");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "No Data Matched"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Remove a Specific Nature
 */
module.exports.remove = async (req, res, next) => {
  if (CheckIfEmpty(req.body.id)) {
    var thirdParty = await Thirdparty.destroy({ where: { id: req.body.id } });
    if (thirdParty) {
      logs("Third Party", "Third Party ( " + req.body.id + " ) Deleted");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "Deletion Error"));
  } else res.json(RES(403, "Parameter Not Found"));
};

/**
 * Method to Fetch all Nature from the Database
 */
module.exports.fetchAll = async (req, res, next) => {
  var thirdParty = await Thirdparty.findAll();
  if (thirdParty) {
    logs("Third Party", "Fetched All");
    res.json(RES(200, "Success", thirdParty));
  } else res.json(RES(403, "SQL Error"));
};

/**
 * Method to Fetch a Specific Third Party  from the Database
 */
module.exports.filter = async (req, res, next) => {
  if (CheckIfEmpty(req.body.custId)) {
    var thirdParty = await Thirdparty.findAll({
      where: { custId: req.body.custId },
    });
    if (thirdParty) {
      logs(
        "Specific Third Party Fetched",
        "Fetching a Specific third party from the Database"
      );
      res.json(RES(200, "Success", thirdParty));
    } else res.json(RES(403, "No Data Matched Error"));
  } else res.json(RES(403, "Credentials Error"));
};
