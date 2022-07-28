/**
 * API Response Standard Format
 */
const RES = require("../helpers/utils").response;

/**
 * Geo Library Imported to Track Map Distances in Radius
 */
const geolib = require("geolib");
var geocoding = new require("reverse-geocoding");
/**
 * Importing Logs Helper
 */
const { logs } = require("./../helpers/logs");
const User = require("../models/user");

module.exports.getCenter = async (req, res, next) => {
  var data = req.body.data;
  var { latitude, longitude } = await geolib.getCenter(data);
  if (latitude && longitude) {
    logs(
      "Geo Library",
      "Map Center Extracted from Lat: " + latitude + " Lng: " + longitude
    );
    res.json(RES(200, "Successfull !", { latitude, longitude }));
  } else {
    res.json(RES(403, "Error !", { latitude: 0, longitude: 0 }));
  }
};

module.exports.getDistance = async (req, res, next) => {
  var data = req.body.data;
  let info = [];
  for (let i = 0; i < data.List.length; i++) {
    let ele = data.List[i];
    var distance = await geolib.getDistance(
      { latitude: data.latitude, longitude: data.longitude },
      { latitude: ele.latitude, longitude: ele.longitude }
    );
    var user = await User.findOne({
      where: { contact: ele.contact, roleId: 4 },
    });
    info.push({
      latitude: ele.latitude,
      longitude: ele.longitude,
      distance: Number(distance) / 1000 + " km",
      responder: user,
    });
  }
  info1 = info.sort(function (a, b) {
    var keyA = a.distance;
    var keyB = b.distance;
    if (keyA < keyB) {
      return -1;
    }
    if (keyA > keyB) {
      return 1;
    }
    return 0;
  });
  if (info1) {
    // logs(
    //   "Geo Library",
    //   "Map Center Extracted from Lat: " + latitude + " Lng: " + longitude
    // );
    res.json(RES(200, "Successfull !", info1));
  } else {
    res.json(RES(403, "Error !"));
  }
};

module.exports.reverseGeocoding = async (req, res, next) => {
  var data = req.body.data;
  // var { latitude, longitude } = await geolib.getCenter(data);
  var config = {
    latitude: 40.00403611111111,
    longitude: 116.48485555555555,
    language: "zh-cn",
  };
  geocoding(config, (err, data) => {
    console.log(err ? err : data);
  });
  if (latitude && longitude) {
    logs(
      "Geo Library",
      "Map Center Extracted from Lat: " + latitude + " Lng: " + longitude
    );
    res.json(RES(200, "Successfull !", { latitude, longitude }));
  } else {
    res.json(RES(403, "Error !", { latitude: 0, longitude: 0 }));
  }
};
