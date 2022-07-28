/**
 * API Response Standard Format
 */
var RES = require("../helpers/utils").response;

/**
 * Importing Geofence Database Model
 */
const chatLogs = require("./../models/chatLogs");
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
 * Method to Add a New Chat
 */
module.exports.create = async (req, res, next) => {
  if (
    CheckIfEmpty(req.body.message) &&
    CheckIfEmpty(req.body.sendUserId) &&
    CheckIfEmpty(req.body.recieveUserId)
  ) {
    var sendUser = await User.findOne({ where: { id: req.body.sendUserId } });
    var recieveUser = await User.findOne({
      where: { id: req.body.recieveUserId },
    });
    var created = await chatLogs.create({
      Message: req.body.message,
      sendUserId: req.body.sendUserId,
      sendUserName: sendUser.firstname,
      recieveUserId: req.body.recieveUserId,
      recieveUserName: recieveUser.firstname,
    });
    if (created) {
      res.json(RES(200, "Chat logs Creation Success", created));
    } else res.json(RES(403, "Chat Logs Creation Failed"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Fetch All Chats
 */
module.exports.fetchAll = async (req, res, next) => {
  var log = await chatLogs.findAll();
  if (log) {
    logs("Chat Logs", "Fetched All");
    res.json(RES(200, "Success", log));
  } else res.json(RES(403, "SQL Error"));
};

/**
 * Method to Fetch a Specific Chat between 2 Users
 */
module.exports.chatFilter = async (req, res, next) => {
  if (
    CheckIfEmpty(req.body.sendUserId) &&
    CheckIfEmpty(req.body.recieveUserId)
  ) {
    var chat = await chatLogs.findAll({
      where: {
        sendUserId: req.body.sendUserId,
        recieveUserId: req.body.recieveUserId,
      },
    });
    if (chat) {
      //   logs("Town", " All Town Fetched against a Specific City ");
      res.json(RES(200, "Success", chat));
    } else res.json(RES(403, "SQL Error"));
  } else res.json(RES(403, "Credentials Error"));
};
