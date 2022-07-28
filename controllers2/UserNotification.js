/**
 * API Response Standard Format
 */
var RES = require("../helpers/utils").response;
/**
 * Importing private Notification Database Model
 */
const UserNotification = require("./../models/UserNotification");
/**
 * Method to Add a New private Notification
 */
module.exports.create = async (req, res, next) => {
  var created = await UserNotification.create({ ...req.body });
  if (created) {
    res.json(RES(200, "success"));
  } else {
    res.json(RES(200, "Error in posting please check your database"));
  }
};
module.exports.getallnotifications = async (req, res, next) => {
  var allnotification = await UserNotification.findAll({});
  if (allnotification) {
    res.json(RES(200, "success", allnotification));
  } else {
    res.json(RES(403, "Error in get all please check your database"));
  }
};
