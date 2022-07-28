var RES = require("../helpers/utils").response;
const ServiceProvider = require("../models/serviceProvider");
const geolib = require("geolib");

module.exports.fetchAll = (req, res, next) => {
  ServiceProvider.findAll()
    .then(result => {
      res.json(RES(200, "Successfull !", result));
    })
    .catch(e => {
      res.json(RES(403, "Not Found !"));
    });
};

module.exports.fetchViaAddress = (req, res, next) => {
  // res.json(req.body);
  var add = null;
  if (
    req.body.param != null &&
    req.body.param != "" &&
    typeof req.body.param != "undefined" &&
    req.body.param != {}
  ) {
    add = {
      lat: req.body.param.lat,
      long: req.body.param.long
    };
  } else {
    add = {
      lat: req.body.lat,
      long: req.body.long
    };
  }

  ServiceProvider.findAll()
    .then(result => {
      var servicePoints;
      servicePoints = result.filter(r => {
        var { lat, long, radius } = r;
        return geolib.isPointWithinRadius(
          {
            latitude: add.lat,
            longitude: add.long
          },
          { latitude: lat, longitude: long },
          radius * 1000
        );
      });
      res.json(RES(200, "Successfull !", servicePoints));
    })
    .catch(e => {
      res.json(RES(403, "Not Found !"));
    });
};

module.exports.create = (req, res, next) => {
  var serviceProvider = {
    name: req.body.name,
    lat: req.body.lat,
    long: req.body.long,
    radius: req.body.radius
  };
  ServiceProvider.create(serviceProvider)
    .then(result => {
      res.json(RES(200, "Successfull !", true));
    })
    .catch(e => {
      res.json(RES(403, "SQL Error !"));
    });
};
