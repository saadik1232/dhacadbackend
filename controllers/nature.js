const Nature = require("../models/nature");
const RES = require("../helpers/utils").response;

module.exports.fetchAll = (req, res, next) => {
  Nature.findAll()
    .then(result => {
      res.json(RES(200, "Successfull !", result));
    })
    .catch(e => {
      res.json(RES(403, "Error !"));
    });
};

module.exports.create = (req, res, next) => {
  var nature = {
    name: req.body.name,
    active: req.body.active
  };
  Nature.create(nature)
    .then(result => {
      res.json(RES(200, "Successfull !", true));
    })
    .catch(e => {
      res.json(RES(403, "Error !"));
    });
};

module.exports.remove = (req, res, next) => {
  var id = req.params.id;
  Nature.findAll({
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
  var nature = {
    name: req.body.name,
    active: req.body.active
  };
  Nature.findAll({
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
        result.name = nature.name;
        result.active = nature.active;
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
