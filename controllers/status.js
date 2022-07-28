const Status = require("../models/status");
const RES = require("../helpers/utils").response;

module.exports.fetchAll = (req, res, next) => {
  Status.findAll()
    .then(result => {
      res.json(RES(200, "Successfull !", result));
    })
    .catch(e => {
      res.json(RES(403, "Error !"));
    });
};

module.exports.create = (req, res, next) => {
  var status = {
    name: req.body.name,
    active: req.body.active
  };
  Status.create(status)
    .then(result => {
      res.json(RES(200, "Successfull !", true));
    })
    .catch(e => {
      res.json(RES(403, "Error !"));
    });
};

module.exports.remove = (req, res, next) => {
  var id = req.params.id;
  Status.findAll({
    where: {
      id: id
    }
  })
    .then(result => {
      if (result.length > 0) {
        return result[0];
      } else {
        return null;
      }
    })
    .then(result => {
      if (result != null) {
        result.destroy();
        res.json(RES(200, "Successfull !", true));
      } else {
        res.json(RES(403, "Unknown Data !"));
      }
    })
    .catch(e => {
      res.json(RES(403, "Error !"));
    });
};

module.exports.update = (req, res, next) => {
  var id = req.params.id;
  var status = {
    name: req.body.name,
    active: req.body.active
  };
  Status.findAll({
    where: {
      id: id
    }
  })
    .then(result => {
      if (result.length > 0) {
        return result[0];
      } else {
        return null;
      }
    })
    .then(result => {
      if (result != null) {
        result.name = status.name;
        result.active = status.active;
        result.save();
        res.json(RES(200, "Successfull !", true));
      } else {
        res.json(RES(403, "Unknown Data !"));
      }
    })
    .catch(e => {
      res.json(RES(403, "Error !"));
    });
};
