/**
 * API Response Standard Format
 */
var RES = require("../helpers/utils").response;

/**
 * Base 64
 */
const { encode } = require("base-64");

/**
 * Lodash
 */
const _ = require("lodash");

/**
 * Axios
 */
const axios = require("axios");

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
 *
 */
const { TRACCAR } = require("./../configs/config");
const Panic = require("../models/panic");

/**
 * Method to Fetch all Responder from the Database
 */
module.exports.fetchAll = async (req, res, next) => {
  var user = await User.findAll({ where: { roleId: 4 } });
  if (user) {
    logs("Responder", "Fetched All");
    // var user = await .findAll({ where: { roleId: 4 } });
    res.json(RES(200, "Success", user));
  } else res.json(RES(403, "SQL Error"));
};

/**
 * Method to Fetch a Specific Responder from the Database
 */
module.exports.filter = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id)) {
    var user = await User.findOne({ where: { id: req.params.id, roleId: 4 } });
    if (user) {
      logs(
        " Specific Responder Fetched ",
        "Fetching a Specific Responder from the Database"
      );
      res.json(RES(200, "Success", user));
    } else res.json(RES(403, "No Data Matched Error"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Update the Lat & Lng of a Specific Responder
 */
module.exports.fetchAllResponders = async (req, res, next) => {
  var url = TRACCAR + "devices";
  var url2 = TRACCAR + "positions";
  var user = "admin";
  var password = "L@s3rjet9045";
  var token = "Basic " + encode(user + ":" + password);
  await axios
    .get(url, {
      headers: {
        Authorization: token,
      },
    })
    .then(async (result) => {
      await axios
        .get(url2, {
          headers: {
            Authorization: token,
          },
        })
        .then(async (result2) => {
          var details = [];
          for (let i = 0; i < result.data.length; i++) {
            for (let j = 0; j < result2.data.length; j++) {
              if (result.data[i].positionId == result2.data[j].id) {
                var element = result.data[i];
                element.position = result2.data[j];
                element.db = await User.findOne({
                  where: {
                    roleId: 4,
                    trackingId: element.id,
                  },
                });
                details.push(element);
              }
            }
          }
          res.json(RES(200, "Success", details));
        })
        .catch((e) => {
          res.json(RES(403, "Positions Error"));
        });
    })
    .catch((e) => {
      res.json(RES(403, "Devices Error"));
    });
};

/**
 * Method to Update the Lat & Lng of a Specific Responder
 */
module.exports.sendLocation = async (req, res, next) => {
  if (
    CheckIfEmpty(req.body.id) &&
    CheckIfEmpty(req.body.lat) &&
    CheckIfEmpty(req.body.lng)
  ) {
    var responder = await User.findOne({
      where: { id: req.body.id, roleId: 4 },
    });
    if (responder) {
      logs(
        "Responder Location sent",
        "Responder Location Extracted from  Lat: " +
          req.body.lat +
          " Lng: " +
          req.body.lng
      );
      responder.lat = req.body.lat;
      responder.lng = req.body.lng;
      responder.save();
      res.json(RES(200, "Success"));
    } else res.json(RES(200, "No Data Matched Error"));
  } else res.json(RES(200, "Credentails Error"));
};

/**
 * Method to Fetch all Busy Responder from the Database
 */
module.exports.fetchAllBuzy = async (req, res, next) => {
  // res.json(RES(200, "Success"));
  // var user = await User.findAll({ where: { roleId: 4, userAssignment: true } });
  // if (user) {
  //   logs(" Busy Responders", "Fetched All Busy Responders");
  //   res.json(RES(200, "Success", user));
  // } else res.json(RES(403, "SQL Error"));
  var panic = await Panic.findAll({
    where: { statusId: [3, 4], isCancelled: [0, null] },
  });
  let info = [];
  await panic.map((p) => {
    if (p.responderInvolved != null && p.responderInvolved != 0) {
      info.push(p.responderInvolved);
    }
  });
  // for (let i = 0; i < panic.length; i++) {
  //   let element = panic[i];
  //   // console.log(element);
  //   if (element.responderInvolved != null && element.responderInvolved != 0) {
  //     await info.push(element.responderInvolved);
  //   }
  // }
  res.json(RES(200, "Success", info));
};

/**
 * Method to Fetch all Free Responder from the Database
 */
module.exports.fetchAllFree = async (req, res, next) => {
  // res.json(RES(200, "Success"));
  var user = await User.findAll({
    where: { roleId: 4, userAssignment: [0, false, null] },
  });
  if (user) {
    logs(" Free Responders", "Fetched All Free Responders");
    res.json(RES(200, "Success", user));
  } else res.json(RES(403, "SQL Error"));
};
