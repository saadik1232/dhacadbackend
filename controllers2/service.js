/**
 * API Response Standard Format
 */
var RES = require("../helpers/utils").response;

/**
 * Importing Service Database Model
 */
const Service = require("./../models/service");

/**
 * Importing User Database Model
 */
const User = require("./../models/user");

/**
 * Importing Geofence Database Model
 */
const Geofence = require("./../models/geofences");

/**
 * Importing Data Validator
 */
const { CheckIfEmpty } = require("./../helpers/utils");

/**
 * Importing Geo Liibrary to Calculate the Map Distance based on Radius etc
 */
const geolib = require("geolib");

/**
 * Importing Logs Helper
 */
const { logs } = require("./../helpers/logs");

/**
 * Axios Requesting Library
 */
const axios = require("axios");

/**
 * Base-64
 */
const { encode, decode } = require("base-64");

/**
 * Method to Add a New Service
 */
module.exports.create = async (req, res, next) => {
  if (
    CheckIfEmpty(req.body.name) &&
    CheckIfEmpty(req.body.lat) &&
    CheckIfEmpty(req.body.lng) &&
    CheckIfEmpty(req.body.radius) &&
    CheckIfEmpty(req.body.userId)
  )
    var created = await Service.create({ ...req.body });
  if (created) {
    logs("Service", "New Service Created");
    res.json(RES(200, "Service Creation Success"));
  } else res.json(RES(403, "Service Creation Failed"));
};

/**
 * Method to Update a Specific Service
 */
module.exports.update = async (req, res, next) => {
  if (
    CheckIfEmpty(req.params.id) &&
    CheckIfEmpty(req.body.name) &&
    CheckIfEmpty(req.body.lat) &&
    CheckIfEmpty(req.body.lng) &&
    CheckIfEmpty(req.body.radius) &&
    CheckIfEmpty(req.body.userId)
  ) {
    var service = await Service.findOne({ where: { id: req.params.id } });
    if (service) {
      service.update({ ...req.body });
      logs("Service", "Service ( " + req.params.id + " ) Updated");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "No Data Matched"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Remove a Specific Service
 */
module.exports.remove = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id)) {
    var service = await Service.destroy({ where: { id: req.params.id } });
    if (service) {
      logs("Service", "Service ( " + req.params.id + " ) Deleted");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "Deletion Error"));
  } else res.json(RES(403, "Parameter Not Found"));
};

/**
 * Method to Fetch all Services from the Database
 */
module.exports.fetchAll = async (req, res, next) => {
  var services = await Service.findAll({ include: [User, Geofence] });
  if (services) {
    logs("Service", "Fetched All");
    res.json(RES(200, "Success", services));
  } else res.json(RES(403, "SQL Error"));
};

/**
 *
 */
const geo = async (lat1, lng1, lat2, lng2, radius) => {
  var data = await geolib.isPointWithinRadius(
    {
      latitude: Number(lat1),
      longitude: Number(lng1),
    },
    { latitude: Number(lat2), longitude: Number(lng2) },
    radius * 1000
  );
  console.log("Data: ", data);
  return data;
};

/**
 * Finding all the Customer who have Applied for Subscriptions
 */
module.exports.findCustomerWhoApplied = async (req, res, next) => {
  var users = await User.findAll({ where: { roleId: 5 } });
  var subscribedUsers = [];
  for (var i = 0; i < users.length; i++) {
    var u = users[i];
    if (CheckIfEmpty(u.serviceId)) {
      await subscribedUsers.push(u);
    }
  }
  res.json(RES(200, "Success", subscribedUsers));
  // res.json(RES(200, "Success"));
};

/**
 *
 * Polygon Syntax to Array
 */
const polygonString = (data) => {
  var part1 = data.split("POLYGON((");
  var part2 = part1[1].split("))");
  var part3 = part2[0];
  var part4 = part3.split(", ");
  var part5 = [];
  for (let index = 0; index < part4.length; index++) {
    const element = part4[index];
    var part6 = element.split(" ");
    part5.push({ latitude: Number(part6[1]), longitude: Number(part6[0]) });
  }
  return part5;
};

/**
 *
 * Ploygon Sets to 2D Array
 */
const fetchPolygon = (data) => {
  var info = [];
  var info2 = [];
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    var detail = {
      id: element.id,
      coords: polygonString(element.area),
    };
    var detail2 = element.name;
    info.push(detail);
    info2.push(detail2);
  }
  return { info, info2 };
};

/**
 * Method to find all the Available Services, Using Lat & Lng within
 * A Specific Area Radius
 */
// module.exports.fetchViaAddress = async (req, res, next) => {
//   if (CheckIfEmpty(req.body.lat) && CheckIfEmpty(req.body.lng)) {
//     var services = await Service.findAll();
//     var points = services.filter((s) => {
//       var { lat, lng, radius } = s;
//       return geolib.isPointWithinRadius(
//         {
//           latitude: Number(req.body.lat),
//           longitude: Number(req.body.lng),
//         },
//         { latitude: Number(lat), longitude: Number(lng) },
//         radius * 1000
//       );
//     });
//     if (points) res.json(RES(200, "Successfull !", points));
//     else res.json(RES(403, "Algorithm Error !"));
//   } else res.json(RES(403, "Credentials Error !"));
// };

const fetcher = async (user, pass, cb = null) => {
  var Traccar = "http://192.168.50.41:8082/api/";
  var url = Traccar + "geofences";
  var tokenString = user + ":" + pass;
  var token = encode(tokenString);
  // res.json(RES(200, "Success", token));
  await axios
    .get(url, { headers: { Authorization: "Basic " + token } })
    .then((result) => {
      if (result.data) {
        cb(fetchPolygon(result.data));
        //res.json(RES(200, "Success", fetchPolygon(result.data)));
      } else {
        //res.json(RES(403, "Response Error !"));
      }
    })
    .catch((e) => {
      //res.json(RES(403, "Error !"));
    });
};

module.exports.fetchViaAddress = async (req, res, next) => {
  if (CheckIfEmpty(req.body.lat) && CheckIfEmpty(req.body.lng)) {
    await fetcher(req.body.user, req.body.pass, async (DATA) => {
      var data = DATA.info;
      var name = DATA.info2;
      var info = [];
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const { coords } = element;
        // const format =
        const result = geolib.isPointInPolygon(
          { latitude: Number(req.body.lat), longitude: Number(req.body.lng) },
          coords
        );

        // res.json(RES(200, "Success", result));
        if (result) {
          info.push(element);
        }
      }
      // res.json(RES(200, "Data", { info, DATA }));
      // res.json(RES(200, "Success", info));
      // await Service.findOne({where:)
      var info3 = [];
      for (let i = 0; i < info.length; i++) {
        var idd = info[i].id;
        var geo = await Geofence.findOne({ where: { geofenceId: idd } });
        if (geo) {
          info3.push(geo.id);
        }
      }
      if (info3.length > 0) {
        var info4 = [];
        for (let i = 0; i < info3.length; i++) {
          var idd = info3[i];
          var ser = await Service.findOne({ where: { id: idd } });
          info4.push(ser);
        }
        res.json(RES(200, "Success", info4));
      } else {
        res.json(RES(403, "Error"));
      }
    });
  }
};
