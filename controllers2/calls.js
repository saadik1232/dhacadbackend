/**
 * API Response Standard Format
 */
var RES = require("../helpers/utils").response;

const User = require("./../models/user");

const { automateCall } = require("./../helpers/automateCall/playback");
const { Conference } = require("./../helpers/Conference/originate2");
const { singleCall } = require("./../helpers/simpleCall/originate");

module.exports.conferenceCall = async (req, res, next) => {
  // var data1 = req.body.data;
  let result = await Conference(req.body.data);
  if (result) {
    res.json(RES(200, "Conference Call Successfull", result));
  } else res.json(RES(403, "Conference Call error"));
};

module.exports.automatedCall = (req, res, next) => {
  //   res.json(RES(200, "Success"));
  var data1 = req.body.data;
  // res.json(RES(403, "Automate Call error", data1));
  let result = automateCall(data1);
  // res.json(RES(403, "Print result", result));
  if (result) {
    res.json(RES(200, "Automate Call Successfull", result));
  } else res.json(RES(403, "Automate Call error"));
};

module.exports.singleCall = (req, res, next) => {
  //   res.json(RES(200, "Success"));
  var data1 = req.body.data;
  // res.json(RES(403, "Automate Call error", data1));
  let result = singleCall(data1);
  // res.json(RES(403, "Print result", result));
  if (result) {
    res.json(RES(200, "Simple Call Successfull", result));
  } else res.json(RES(403, "Simple Call error"));
};
