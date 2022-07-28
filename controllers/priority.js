const Priority = require("../models/priority");
const RES = require("../helpers/utils").response;

module.exports.fetchAll = (req, res, next) => {
  Priority.findAll()
    .then(result => {
      res.json(RES(200, "Successfull !", result));
    })
    .catch(e => {
      res.json(RES(403, "Error !"));
    });
};

module.exports.create = (req, res, next) => {
  var priority = {
    name: req.body.name,
    active: req.body.active
  };
  Priority.create(priority)
    .then(result => {
      res.json(RES(200, "Successfull !", true));
    })
    .catch(e => {
      res.json(RES(403, "Error !"));
    });
};

module.exports.remove = (req, res, next) => {
  var id = req.params.id;
  Priority.findAll({
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
  var priority = {
    name: req.body.name,
    active: req.body.active
  };
  Priority.findAll({
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
        result.name = priority.name;
        result.active = priority.active;
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
