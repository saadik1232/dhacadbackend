var RES = require("../helpers/utils").response;
const User = require("../models/user");
const Panic = require("../models/panic");
const Assigned = require("../models/assigned");
const Device = require("../models/devices");
const jwt = require("jsonwebtoken");
const { KEY } = require("../configs/jwt");
const Role = require("../models/role");
const axios = require("axios");
const { URL } = require("../configs/config");

module.exports.register = (req, res, next) => {
  var user = null;
  if (
    req.body.param != null &&
    req.body.param != "" &&
    typeof req.body.param != "undefined" &&
    req.body.param != {}
  ) {
    user = {
      password: req.body.param.password,
      firstname: req.body.param.firstname,
      lastname: req.body.param.lastname,
      cnic: req.body.param.cnic,
      contact: req.body.param.contact,
      email: req.body.param.email,
      lat: req.body.param.lat,
      long: req.body.param.long,
      address: req.body.param.address,
      service_provider_id: req.body.param.service_provider_id,
      token: "",
      roleId: req.body.param.roleId,
    };
  } else {
    user = {
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      cnic: req.body.cnic,
      contact: req.body.contact,
      email: req.body.email,
      lat: req.body.lat,
      long: req.body.long,
      address: req.body.address,
      service_provider_id: req.body.service_provider_id,
      token: "",
      roleId: req.body.roleId,
    };
  }
  User.create({ ...user })
    .then((result) => {
      res.json(RES(200, "Successfull !"));
    })
    .catch((e) => {
      res.json(RES(403, "Error ( Some Attributes Might BE Missing ) !"));
    });
};

module.exports.updateUser = (req, res, next) => {
  var id = req.params.id || 0;
  var user = null;
  if (
    req.body.param != null &&
    req.body.param != "" &&
    typeof req.body.param != "undefined" &&
    req.body.param != {}
  ) {
    user = req.body.param;
  } else {
    user = req.body;
  }
  User.findAll({ where: { id: id } })
    .then((response) => {
      if (response.length > 0) {
        return response[0];
      } else {
        return null;
      }
    })
    .then((result) => {
      if (result == null) {
        res.json(RES(403, "Not Found ! "));
      } else {
        result.firstname = user.firstname || "";
        result.lastname = user.lastname || "";
        result.cnic = user.cnic || "";
        result.contact = user.contact || "";
        result.email = user.email || "";
        result.password = user.password || "";
        result.lat = user.lat || "";
        result.long = user.long || "";
        result.address = user.address || "";
        result.token = user.token || "";
        result.service_provider_id = user.service_provider_id || 0;
        result.approval = user.approval || 1;
        result.isSupervisor = user.isSupervisor || 0;
        // result.roleId = user.roleId || 0;
        result.save();
        res.json(RES(200, "Successfull ! ", result));
      }
    })
    .catch((e) => {
      res.json(RES(403, "Error Finding the Users !"));
    });
};

module.exports.sendResponderLocation = (req, res, next) => {
  var id = req.params.id || 0;
  var user = null;
  if (
    req.body.param != null &&
    req.body.param != "" &&
    typeof req.body.param != "undefined" &&
    req.body.param != {}
  ) {
    user = req.body.param;
  } else {
    user = req.body;
  }
  User.findAll({ where: { id: id } })
    .then((response) => {
      if (response.length > 0) {
        return response[0];
      } else {
        return null;
      }
    })
    .then((result) => {
      if (result == null) {
        res.json(RES(403, "Not Found ! "));
      } else {
        result.lat = user.lat || "";
        result.long = user.long || "";
        result.save();
        res.json(RES(200, "Successfull ! ", result));
      }
    })
    .catch((e) => {
      res.json(RES(403, "Error Finding the Users !"));
    });
};

module.exports.getAllResponderLocation = (req, res, next) => {
  User.findAll({ where: { roleId: 4 } })
    .then((response) => {
      var locations = [];
      for (let i = 0; i < response.length; i++) {
        locations.push({
          lat: response[i].lat,
          long: response[i].long,
        });
      }
      res.json(RES(200, "Successfull !", locations));
    })
    .catch((e) => {
      res.json(RES(200, "Error Finding Users !"));
    });
};

module.exports.getResponderLocation = (req, res, next) => {
  User.findAll({ where: { roleId: 4, id: req.params.id } })
    .then((response) => {
      var locations = {
        lat: response[0].lat,
        long: response[0].long,
      };
      res.json(RES(200, "Successfull !", locations));
    })
    .catch((e) => {
      res.json(RES(200, "Error Finding Users !"));
    });
};

module.exports.approve = (req, res, next) => {
  var id = req.params.id;
  User.findAll({ where: { id: id, roleId: 5 } })
    .then((result) => {
      if (result.length > 0) {
        result[0].approval = true;
        return result[0].save();
      } else {
        res.json(RES(403, "Not Matched Error !"));
      }
    })
    .then((result) => {
      res.json(RES(200, "Successfull !"));
    })
    .catch((e) => {
      res.json(RES(403, "Error ( Some Attributes Might BE Missing ) !"));
    });
};

module.exports.fetchAllUsers = (req, res, next) => {
  User.findAll({
    include: [Role],
  })
    .then((result) => {
      res.json(RES(200, "Successfull !", result));
    })
    .catch((e) => {
      res.json(RES(403, "Error ( SOme Attributes Might BE Missing ) !"));
    });
};

module.exports.responderStatus = async (req, res, next) => {
  var iid = 0;
  if (
    req.body.param != null &&
    req.body.param != "" &&
    typeof req.body.param != "undefined"
  ) {
    iid = req.body.param.id;
  } else {
    iid = req.body.id;
  }
  await User.findAll({ where: { contact: iid } })
    .then(async (ress) => {
      if (ress.length > 0) {
        ress = ress[0];
        await Assigned.findAll({
          where: {
            responderId: ress.id,
            responder_status: [0, 1],
          },
        })
          .then((result) => {
            result = result[0];
            res.json(RES(200, "Successfull 3 !", result));
          })
          .catch((e) => {
            res.json(
              RES(403, "Error ( SOme Attributes Might BE Missing ) 1 !")
            );
          });
      } else {
        res.json(RES(403, "Error ( SOme Attributes Might BE Missing ) 2 !"));
      }
    })
    .catch((e) => {
      res.json(RES(403, "Error ( SOme Attributes Might BE Missing ) 3 !"));
    });
};

module.exports.responderConfirmStatus = async (req, res, next) => {
  var iid = 0;
  if (
    req.body.param != null &&
    req.body.param != "" &&
    typeof req.body.param != "undefined"
  ) {
    iid = req.body.param.id;
  } else {
    iid = req.body.id;
  }
  await User.findAll({ where: { contact: iid } })
    .then(async (ress) => {
      if (ress.length > 0) {
        ress = ress[0];
        await Assigned.findAll({
          where: {
            responderId: ress.id,
            responder_status: 0,
          },
        })
          .then((result) => {
            result = result[0];
            if (result.responder_status == 0) {
              result.responder_status = 1;
            }
            result.save();
            res.json(
              RES(200, "Successfull 3 !", {
                saved: true,
              })
            );
          })
          .catch((e) => {
            res.json(
              RES(403, "Error ( SOme Attributes Might BE Missing ) 1 !")
            );
          });
      } else {
        res.json(RES(403, "Error ( SOme Attributes Might BE Missing ) 2 !"));
      }
    })
    .catch((e) => {
      res.json(RES(403, "Error ( SOme Attributes Might BE Missing ) 3 !"));
    });
};

module.exports.responderResolveStatus = async (req, res, next) => {
  var iid = 0;
  if (
    req.body.param != null &&
    req.body.param != "" &&
    typeof req.body.param != "undefined"
  ) {
    iid = req.body.param.id;
  } else {
    iid = req.body.id;
  }
  await User.findAll({ where: { contact: iid } })
    .then(async (ress) => {
      if (ress.length > 0) {
        ress = ress[0];
        await Assigned.findAll({
          where: {
            responderId: ress.id,
            responder_status: 1,
          },
        })
          .then(async (result) => {
            result = result[0];

            await Panic.findAll({
              where: {
                id: result.panicId,
              },
            })
              .then((response2) => {
                // res.json(RES(404, "Test !", result.panicId));
                if (result.responder_status == 1) {
                  result.responder_status = 2;
                }
                result.save();
                if (response2.length > 0) {
                  response2 = response2[0];
                  response2.statusId = 5;
                  response2.save();
                  res.json(
                    RES(200, "Successfull 3 !", {
                      saved: true,
                    })
                  );
                } else {
                  res.json(RES(403, "Error 7 !"));
                }
              })
              .catch((e) => {
                res.json(RES(403, "Error 6 !"));
              });
          })
          .catch((e) => {
            res.json(
              RES(403, "Error ( SOme Attributes Might BE Missing ) 3 !")
            );
          });
      } else {
        res.json(RES(403, "Error ( SOme Attributes Might BE Missing ) 2 !"));
      }
    })
    .catch((e) => {
      res.json(RES(403, "Error ( SOme Attributes Might BE Missing ) 1 !"));
    });
};

module.exports.fetchAllOperators = (req, res, next) => {
  User.findAll({
    where: {
      roleId: 3,
    },
    include: [Role],
  })
    .then((result) => {
      res.json(RES(200, "Successfull !", result));
    })
    .catch((e) => {
      res.json(RES(403, "Error ( SOme Attributes Might BE Missing ) !"));
    });
};

module.exports.fetchOperator = (req, res, next) => {
  User.findAll({
    where: {
      id: req.params.id,
      roleId: 3,
    },
    include: [Role],
  })
    .then((result) => {
      if (result.length > 0) {
        res.json(RES(200, "Successfull !", result[0]));
      } else {
        res.json(RES(403, "Error ( SOme Attributes Might BE Missing ) !"));
      }
    })
    .catch((e) => {
      res.json(RES(403, "Error ( SOme Attributes Might BE Missing ) !"));
    });
};

module.exports.removeUser = (req, res, next) => {
  var id = req.params.id;
  User.findAll({ where: { id: id } })
    .then((result) => {
      if (result.length > 0) {
        result[0].destroy();
        res.json(RES(200, "Successfull !"));
      } else {
        res.json(RES(403, "Error !"));
      }
    })
    .catch((e) => {
      res.json(RES(403, "Error ( SOme Attributes Might BE Missing ) !"));
    });
};

module.exports.operatorsRevert = (req, res, next) => {
  var chunks = req.body.chunks;
  User.findAll({
    where: {
      roleId: 3,
    },
    include: [Role],
  })
    .then((result) => {
      var r = result.filter((m) => !chunks.includes(m.id));
      res.json(RES(200, "Successfull !", r));
    })
    .catch((e) => {
      res.json(RES(403, "Error ( SOme Attributes Might BE Missing ) !"));
    });
};

module.exports.operatorStatus = async (req, res, next) => {
  var users = [];
  var panics = [];
  var users2 = [];
  var panics2 = [];
  await User.findAll({
    where: {
      roleId: 3,
    },
  })
    .then(async (response) => {
      users = response;
      await axios
        .get(URL + "/panics")
        .then(async (response) => {
          var info = response.data.result.data;
          panics = info;
          // Code
          await users.map(async (u) => {
            var count = 0;
            await panics.map(async (p) => {
              if (
                u.id == p.operatorId &&
                (p.statusId == 2 || p.statusId == 3)
              ) {
                count++;
              } else {
              }
            });
            await users2.push({ users: u, count: count });
          });
          res.json(RES(200, "Successfull !", users2));
        })
        .catch((e) => {});
    })
    .catch((e) => {});
};

module.exports.customerAddDevice = (req, res, next) => {
  var device = null;
  if (req.body.param) {
    device = { ...req.body.param };
  } else {
    device = { ...req.body };
  }
  // res.json(RES(200, "Successfull !", device));
  Device.create({ ...device })
    .then((response) => {
      res.json(RES(200, "Successfull !", response));
    })
    .catch((e) => {
      res.json(RES(200, "Error !"));
    });
};

module.exports.getCustomerDevices = (req, res, next) => {
  var device = null;
  if (req.body.param) {
    device = { ...req.body.param };
  } else {
    device = { ...req.body };
  }
  if (device.id) {
    Device.findAll({ where: { id: device.id } })
      .then((response) => {
        if (response.length > 0) {
          res.json(RES(200, "Successfull !", response));
        } else {
          res.json(RES(200, "No Data Found !", []));
        }
      })
      .catch((e) => {
        res.json(RES(200, "Error !"));
      });
  } else {
    Device.findAll()
      .then((response) => {
        if (response.length > 0) {
          res.json(RES(200, "Successfull !", response));
        } else {
          res.json(RES(200, "No Data Found !", []));
        }
      })
      .catch((e) => {
        res.json(RES(200, "Error !"));
      });
  }
  // res.json(RES(200, "Successfull !", device));
};

module.exports.getAllCustomerDevices = (req, res, next) => {
  var device = null;
  if (req.body.param) {
    device = { ...req.body.param };
  } else {
    device = { ...req.body };
  }
  if (device.id) {
    Device.findAll()
      .then((response) => {
        if (response.length > 0) {
          res.json(RES(200, "Successfull !", response));
        } else {
          res.json(RES(200, "No Data Found !", []));
        }
      })
      .catch((e) => {
        res.json(RES(200, "Error !"));
      });
  } else {
    Device.findAll()
      .then((response) => {
        if (response.length > 0) {
          res.json(RES(200, "Successfull !", response));
        } else {
          res.json(RES(200, "No Data Found !", []));
        }
      })
      .catch((e) => {
        res.json(RES(200, "Error !"));
      });
  }
  // res.json(RES(200, "Successfull !", device));
};

module.exports.removeCustomerDevices = (req, res, next) => {
  var device = null;
  if (req.body.param) {
    device = { ...req.body.param };
  } else {
    device = { ...req.body };
  }
  Device.findAll({ where: { id: device.id } })
    .then((response) => {
      if (response.length > 0) {
        response[0].destroy();
        res.json(RES(200, "Successfull !", TRUE));
      } else {
        res.json(RES(200, "No Data Found !", []));
      }
    })
    .catch((e) => {
      res.json(RES(200, "Error !", e));
    });
};

module.exports.login = async (req, res, next) => {
  var user = null;
  if (
    req.body.param != null &&
    req.body.param != "" &&
    typeof req.body.param != "undefined" &&
    req.body.param != {}
  ) {
    user = {
      contact: req.body.param.username,
      password: req.body.param.password,
      // roleId: req.body.params.roleId
    };
  } else {
    user = {
      contact: req.body.username,
      password: req.body.password,
      // roleId: req.body.roleId
    };
  }
  await User.findAll({
    where: {
      contact: user.contact,
      password: user.password,
    },
  })
    .then((result) => {
      if (result.length > 0) {
        return result[0];
      } else {
        return 0;
      }
    })
    .then((result) => {
      user.id = result.id;
      user.roleId = result.roleId;
      user.firstname = result.firstname;
      user.lastname = result.lastname;
      user.contact = result.contact;
      user.cnic = result.cnic;
      user.isSupervisor = result.isSupervisor;
    })
    .catch((e) => {
      console.log("error !");
    });
  var min = 10;
  jwt.sign(user, KEY, { expiresIn: 60 * min }, (err, token) => {
    if (err) {
      res.json(RES(403, "JWT Error !"));
    } else {
      User.findAll({
        where: {
          contact: user.contact,
          password: user.password,
          roleId: user.roleId,
        },
      })
        .then((result) => {
          if (result.length > 0) {
            return result[0];
          } else {
            return null; //res.json(RES(200, "Not Matched !"));
          }
        })
        .then((result) => {
          if (result != null) {
            res.json(RES(200, "Successfull !", token));
          } else {
            res.json(RES(200, "Not Matched !"));
          }
        })
        .catch((e) => {
          res.json(RES(403, "Error !"));
        });
    }
  });
};

module.exports.tokenCheck = (req, res, next) => {
  var token = null;
  if (
    req.body.params != null &&
    req.body.params != "" &&
    typeof req.body.params != "undefined" &&
    req.body.params != {}
  ) {
    token = req.body.params.token;
  } else {
    token = req.body.token;
  }
  console.log("token: ", token);
  if (token != "" && token != null && typeof token != "undefined") {
    jwt.verify(token, KEY, (err, decoded) => {
      if (err) {
        res.json(RES(403, "Decoding Error !"));
      } else {
        res.json(RES(200, "Token Authenticated !"));
      }
    });
  } else {
    token = null;
    res.json(RES(403, "No Token Provided !"));
  }
};
