/**
 * API Response Standard Format
 */
var RES = require("../helpers/utils").response;

/**
 * Importing Geofence Database Model
 */
const Geofence = require("./../models/geofences");

/**
 * Importing Data Validator
 */
const { CheckIfEmpty } = require("./../helpers/utils");

/**
 * Importing Logs Helper
 */
const { logs } = require("./../helpers/logs");
const Service = require("../models/service");

/**
 * Method to Add a Geofence
 */
module.exports.add = async (req, res, next) => {
  if (CheckIfEmpty(req.body.geofenceId) && CheckIfEmpty(req.body.serviceId)) {
    var geofence = await Geofence.create({ ...req.body });
    if (geofence) {
      res.json(RES(200, "Success"));
    } else {
      res.json(RES(403, " Error "));
    }
  } else res.json(RES(403, " Error 2 "));
};

module.exports.makePolygonString = (req, res, next) => {
  var coords = req.body.coords;
  var line = "";
  for (let index = 0; index < coords.length; index++) {
    const element = coords[index];
    var piece = element[0] + " " + element[1];
    if (index != 0) {
      line += ", ";
    }
    line += piece;
  }
  var mainLine = "POLYGON((" + line + "))";
  // return mainLine;
  res.json(RES(200, "Success", { string: mainLine }));
};

module.exports.polygonString = (req, res, next) => {
  const data = req.body.string;
  var part1 = data.split("POLYGON((");
  var part2 = part1[1].split("))");
  var part3 = part2[0];
  var part4 = part3.split(", ");
  var part5 = [];
  for (let index = 0; index < part4.length; index++) {
    const element = part4[index];
    var part6 = element.split(" ");
    part5.push([Number(part6[0]), Number(part6[1])]);
  }
  // return part5;
  res.json(RES(200, "Success", { coords: part5 }));
};

module.exports.fetchAll = async (req, res, next) => {
  var geo = await Geofence.findAll({ include: [Service] });
  if (geo) {
    logs("Geofences", "Fetched All");
    res.json(RES(200, "Success", geo));
  } else res.json(RES(403, "SQL Error"));
};
