/**
 * API Response Standard Format
 */
var RES = require("../helpers/utils").response;

/**
 * Importing User Database Model
 */
const Subscription = require("./../models/subscription");

/**
 * Importing Service Database Model
 */
const Service = require("./../models/service");

/**
 * Importing User Database Model
 */
const User = require("./../models/user");

/**
 * Importing Data Validator
 */
const { CheckIfEmpty } = require("./../helpers/utils");

/**
 * Importing Logs Helper
 */
const { logs } = require("./../helpers/logs");

/**
 * Method to Add a New Subscription
 */
module.exports.create = async (req, res, next) => {
  if (
    CheckIfEmpty(req.body.title) &&
    CheckIfEmpty(req.body.description) &&
    CheckIfEmpty(req.body.cost) &&
    CheckIfEmpty(req.body.duration) &&
    CheckIfEmpty(req.body.usersAllowed) &&
    CheckIfEmpty(req.body.devicesAllowed)
    // CheckIfEmpty(req.body.serviceId)
  ) {
    var created = await Subscription.create({ ...req.body });
    if (created) {
      logs("Subscription", "Subscription Created");
      res.json(RES(200, "Subscription Creation Success"));
    } else res.json(RES(403, "Subscription Creation Failed"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Update a Specific Subscription
 */
module.exports.update = async (req, res, next) => {
  if (
    CheckIfEmpty(req.params.id) &&
    CheckIfEmpty(req.body.title) &&
    CheckIfEmpty(req.body.description) &&
    CheckIfEmpty(req.body.cost) &&
    CheckIfEmpty(req.body.duration) &&
    CheckIfEmpty(req.body.usersAllowed) &&
    CheckIfEmpty(req.body.devicesAllowed) &&
    CheckIfEmpty(req.body.serviceId)
  ) {
    var sub = await Subscription.findOne({ where: { id: req.params.id } });
    if (sub) {
      sub.update({ ...req.body });
      logs("Subscripiton", "Subscripiton ( " + req.params.id + " ) Updated ");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "No Data Matched"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Remove a Specific Subscription
 */
module.exports.remove = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id)) {
    var sub = await Subscription.destroy({ where: { id: req.params.id } });
    if (sub) {
      logs("Subscripiton", "Subscription ( " + req.params.id + " ) Deleted ");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "Deletion Error"));
  } else res.json(RES(403, "Parameter Not Found"));
};

/**
 * Method to Fetch all Subscriptions from the Database
 */
module.exports.fetchAll = async (req, res, next) => {
  var subs = await Subscription.findAll({ include: [Service] });
  if (subs) {
    logs(" Subscription ", " Subscription fetched ");
    res.json(RES(200, "Success", subs));
  } else res.json(RES(403, "SQL Error"));
};

/**
 * Method to Fetch all Subscriptions from the Database in return of the Service Id
 */
module.exports.filter = async (req, res, next) => {
  if (CheckIfEmpty(req.body.id)) {
    var sub = await Subscription.findAll({
      where: { serviceId: req.body.id },
    });
    if (sub) {
      logs(
        " Specific Subscription Fetched ",
        "Fetching a Specific Subscription from the Database"
      );
      res.json(RES(200, "Success", sub));
    } else res.json(RES(403, "No Data Matched Error"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Fetch Specific Subscription Against Particular Service Provider from the Database
 */
module.exports.subscriptionServiceFilter = async (req, res, next) => {
  if (CheckIfEmpty(req.body.id)) {
    var subs = await Subscription.findAll({
      where: { serviceId: req.body.id },
    });
    if (subs) {
      logs(
        "Subscription",
        " All Subscriptions Fetched against a Specific Service "
      );
      res.json(RES(200, "Success", subs));
    } else res.json(RES(403, "SQL Error"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Fetch Specific Subscription Against Particular Service Provider from the Database
 */
module.exports.subscriptionUserFilter = async (req, res, next) => {
  if (CheckIfEmpty(req.body.id)) {
    var user = await User.findOne({ where: { id: req.body.id } });
    // res.json(RES(200, "Success"));
    if (user == null) {
      res.json(RES(403, "No Data Matched"));
    } else {
      var subs = await Subscription.findOne({
        where: { serviceId: user.subscriptionId },
      });
      if (subs) {
        logs("Subscription", " Subscription Fetched against a Specific User ");
        res.json(RES(200, "Success", subs));
      } else res.json(RES(403, "SQL Error"));
    }
  } else res.json(RES(403, "Credentials Error"));
};
