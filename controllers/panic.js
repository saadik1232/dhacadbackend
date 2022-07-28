const Panic = require("../models/panic");
const User = require("../models/user");
const Assigned = require("../models/assigned");
const RES = require("../helpers/utils").response;
const axios = require("axios");
const { fire } = require("./../fire");
const { URL } = require("../configs/config");
const geolib = require("geolib");
// const { fire } = require("../fire");

module.exports.getCenter = async (req, res, next) => {
  var data = req.body.data;
  var { latitude, longitude } = await geolib.getCenter(data);
  if (latitude && longitude) {
    res.json(RES(200, "Successfull !", { latitude, longitude }));
  } else {
    res.json(RES(403, "Error !", { latitude: 0, longitude: 0 }));
  }
};

module.exports.fetchAll = async (req, res, next) => {
  Panic.findAll({ where: { cancellation: false } })
    .then((result) => {
      res.json(RES(200, "Successfull !", result));
    })
    .catch((e) => {
      res.json(RES(403, "Error !"));
    });
};

module.exports.fetchAllAssignments = (req, res, next) => {
  // var id = req.params.id;
  Panic.findAll({ where: { cancellation: false } })
    .then(async (response) => {
      if (response.length > 0) {
        var data1 = [];
        for (let i = 0; i < response.length; i++) {
          await Assigned.findAll({
            where: { panicId: response[i].id, responder_status: [0, 1, 2] },
          })
            .then(async (response2) => {
              if (response2.length > 0) {
                await data1.push({
                  panic: response[i],
                  assignment: response2,
                });
              } else {
                await data1.push({
                  panic: response[i],
                  assignment: null,
                });
              }
            })
            .catch((e) => {});
        }
        var data2 = [];
        // for (let i = 0; i < data1.length; i++) {
        //   await User.findAll({
        //     where: { roleId: 4, id: data1[i].assignment.responderId }
        //   })
        //     .then(async response2 => {
        //       if (response2.length > 0) {
        //         await data2.push({ ...data1[i], responders: response2 });
        //       }
        //     })
        //     .catch(e => {});
        //   // data2.push({ ...data1[i], responders: null });
        // }
        res.json(RES(200, "Successfull !", data1));
      } else {
        res.json(RES(403, "Error !"));
      }
    })
    .catch((e) => {
      res.json(RES(403, "Error !"));
    });
  // Assigned.findAll({ where: { panicId: id, responder_status: 0 } })
  //   .then(result => {
  //     if (result.length > 0) {
  //       res.json(RES(200, "Successfully !", result[0].responderId));
  //     } else {
  //       res.json(RES(403, "Error !", null));
  //     }
  //   })
  //   .catch(e => {
  //     res.json(RES(403, "Error !"));
  //   });
};

const getOperator = async (id, cb) => {
  await User.findAll({ where: { id: id } })
    .then((response) => {
      if (response.length > 0) {
        cb(response[0]);
      } else {
      }
    })
    .catch((e) => {});
};

module.exports.fetchAllWithAll = async (req, res, next) => {
  await Panic.findAll({ where: { cancellation: false } })
    .then(async (result) => {
      if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          var r = result[i];
          console.log(r.operatorId);
          await getOperator(r.operatorId, (data) => {
            r.operatorId = data;
          });
        }
        res.json(RES(200, "Successfull !", result));
      } else {
        res.json(RES(403, "Error not matched...No Panic available 1 !"));
      }
    })
    .catch((e) => {
      res.json(RES(403, "Error catch 2 !"));
    });
};

module.exports.operatorAssignments = (req, res, next) => {
  Panic.findAll({
    where: {
      operatorId: req.body.operator,
      statusId: req.body.status,
      cancellation: false,
    },
  })
    .then((result) => {
      console.log(result);
      res.json(RES(200, "Successfull !", result));
    })
    .catch((e) => {
      res.json(RES(403, "Error !"));
    });
};

module.exports.fetchAllFreeOperator = (req, res, next) => {
  Panic.findAll({ where: { statusId: [2, 3, 4], cancellation: false } })
    .then((result) => {
      if (result.length > 0) {
        var r2 = result.filter((m) => m.operatorId != 0);
        var r = r2.map((m) => {
          var id = m.operatorId;
          return id;
        });
        var ppp = [];
        for (let i = 0; i < r.length; i++) {
          ppp[r[i].id] = 0;
        }
        for (let i = 0; i < r.length; i++) {
          ppp[r[i].id] = ppp[r[i].id] + 1;
        }

        axios
          .post(URL + "/auth/operators/revert", {
            chunks: ppp,
          })
          .then((response) => {
            res.json(RES(200, "Successfull !", response.data.result.data));
          })
          .catch((e) => {
            res.json(RES(407, "Error API"));
          });
      } else {
        axios
          .post(URL + "/auth/operators/revert", {
            chunks: [],
          })
          .then((response) => {
            res.json(RES(200, "Successfull !", response.data.result.data));
          })
          .catch((e) => {
            res.json(RES(407, "Error API"));
          });
      }
    })
    .catch((e) => {
      res.json(RES(403, "Error !"));
    });
};
module.exports.queryPanics = (req, res, next) => {
  Panic.findAll({ where: { operatorId: 0, cancellation: false } })
    .then((result) => {
      if (result.length > 0) {
        var url = URL + "/auth/users/operators";
        axios
          .get(url)
          .then((response) => {
            //var operators = response.data.result.data;
            res.json(RES(200, "Successfull !", response.data));
          })
          .catch((e) => {
            res.json(RES(200, "Api Calling Error !"));
          });
      } else {
        res.json(RES(200, "No Free Panic Available !"));
      }
    })
    .catch((e) => {
      res.json(RES(403, "Error !"));
    });
};

module.exports.create = async (req, res, next) => {
  var panic = null;
  if (
    req.body.param != null &&
    req.body.param != "" &&
    req.body.param != 0 &&
    typeof req.body.param != "undefined"
  ) {
    panic = {
      address: req.body.param.address,
      contact: req.body.param.contact,
      long: req.body.param.long,
      lat: req.body.param.lat,
      operatorId: 0,
      supervisorId: 0,
      natureId: req.body.param.natureId,
      priorityId: req.body.param.priorityId,
      statusId: req.body.param.statusId,
      cancellation: false,
    };
  } else {
    panic = {
      address: req.body.address,
      contact: req.body.contact,
      long: req.body.long,
      lat: req.body.lat,
      operatorId: 0,
      supervisorId: 0,
      natureId: req.body.natureId,
      priorityId: req.body.priorityId,
      statusId: req.body.statusId,
      cancellation: false,
    };
  }

  check(async (data) => {
    panic.operatorId = data.users.id;
    panic.statusId = 2;
    await Panic.create(panic)
      .then(async (result) => {
        await fire(
          "PanicAlarmUser",
          "Congratulations",
          "Panic Created Successfully"
        );
        res.json(RES(200, "Successfull !", result));
      })
      .catch((e) => {
        res.json(RES(403, "Error ( Please Check Foriegn Details ) 3 !", e));
      });
  });
};

const check = async (cb) => {
  var users = [];
  var panics = [];
  await Panic.findAll({ where: { statusId: [2, 3], cancellation: false } })
    .then(async (response2) => {
      await panics.push(response2);
    })
    .catch((e) => {});
  await User.findAll({ where: { roleId: 3 } })
    .then(async (response) => {
      await users.push(response);
    })
    .catch((e) => {});
  if (users.length > 0) {
    users = users[0];
  }
  if (panics.length > 0) {
    panics = panics[0];
  }
  var results = [];
  for (let i = 0; i < users.length; i++) {
    var count = 0;
    var u = users[i];
    for (let j = 0; j < panics.length; j++) {
      if (users[i].id == panics[j].operatorId) {
        count++;
      }
    }
    results[i] = { users: u, count };
  }
  var counter = {
    users: null,
    count: Infinity,
  };
  for (let i = 0; i < results.length; i++) {
    if (results[i].count < counter.count) {
      counter = results[i];
    }
    console.log(results[i].count);
  }
  cb(counter);
};

module.exports.remove = (req, res, next) => {
  var id = req.params.id;
  Panic.findAll({
    where: {
      id: id,
      cancellation: false,
    },
  })
    .then((result) => {
      if (result.length > 0) {
        return result[0];
      } else {
        return null;
      }
    })
    .then((result) => {
      if (result != null) {
        result.destroy();
        res.json(RES(200, "Successfull !", true));
      } else {
        res.json(RES(403, "Unknown Data !"));
      }
    })
    .catch((e) => {
      res.json(RES(403, "Error !"));
    });
};

module.exports.update = (req, res, next) => {
  var id = req.params.id;
  var panic = {
    natureId: req.body.natureId,
    priorityId: req.body.priorityId,
    address: req.body.address,
    long: req.body.long,
    lat: req.body.lat,
    statusId: req.body.statusId,
    operatorId: req.body.operatorId,
    supervisorId: req.body.supervisorId,
  };
  Panic.findAll({
    where: {
      id: id,
      cancellation: false,
    },
  })
    .then((result) => {
      if (result.length > 0) {
        return result[0];
      } else {
        return null;
      }
    })
    .then((result) => {
      if (result != null) {
        result.natureId = panic.natureId;
        result.statusId = panic.statusId;
        result.operatorId = panic.operatorId;
        result.priorityId = panic.priorityId;
        result.supervisorId = panic.supervisorId;
        result.lat = panic.lat;
        result.long = panic.long;
        result.address = panic.address;
        result.save();
        res.json(RES(200, "Successfull !", true));
      } else {
        res.json(RES(403, "Unknown Data !"));
      }
    })
    .catch((e) => {
      res.json(RES(403, "Error !"));
    });
};

module.exports.cancelPanic = (req, res, next) => {
  var id = 0;
  if (req.body.param) {
    id = req.body.param.id;
  } else {
    id = req.body.id;
  }
  // res.json(RES(200, "TEst", id));

  Panic.findAll({ where: { cancellation: false, id: id } })
    .then((response) => {
      if (response.length > 0) {
        return response[0];
      } else {
        return null;
      }
    })
    .then((result) => {
      if (result != null) {
        fire(
          "PanicAlarmUser",
          "Congratulations",
          "Panic Cancelled Successfully"
        );
        result.cancellation = true;
        result.save();
        res.json(RES(200, "Successfull !", result));
      } else {
        res.json(RES(403, "The Panic Does Not Exist !"));
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports.confirmed = (req, res, next) => {
  var id = req.params.id;
  var data = { ...req.body };
  Panic.findAll({
    where: {
      id: id,
      cancellation: false,
    },
  })
    .then((result) => {
      if (result.length > 0) {
        return result[0];
      } else {
        return null;
      }
    })
    .then((result) => {
      if (result != null) {
        fire(
          "PanicAlarmUser",
          "Congratulations",
          "Panic Confirmed Successfully"
        );
        result.statusId = 3; // Confirm Panic Status
        result.contact = data.contact;
        result.address = data.address;
        // result.lat = data.lat;
        // result.long = data.long;
        result.natureId = data.natureId;
        result.priorityId = data.priorityId;
        result.save();
        res.json(RES(200, "Successfull !", true));
      } else {
        res.json(RES(403, "Unknown Data !"));
      }
    })
    .catch((e) => {
      res.json(RES(403, "Error !"));
    });
};

module.exports.assigned = (req, res, next) => {
  var id = req.params.id;
  var resId = req.body.responderId;
  // var panic = {
  //   statusId: req.body.statusId
  // };
  Panic.findAll({
    where: {
      id: id,
      cancellation: false,
    },
  })
    .then((result) => {
      if (result.length > 0) {
        return result[0];
      } else {
        return null;
      }
    })
    .then((result) => {
      Assigned.findAll({
        where: {
          responder_status: 0,
          responderId: resId,
          panicId: id,
        },
      })
        .then((response2) => {
          if (response2.length == 0) {
            if (result != null) {
              result.statusId = 4; // panic.statusId;
              result.save();
              // Code
              var dat = {
                responder_status: 0,
                responderId: resId,
                panicId: result.id,
              };
              Assigned.create(dat)
                .then((response) => {
                  fire(
                    "PanicAlarmResponder",
                    "Assignment",
                    "You have a New Assignment !"
                  );
                  res.json(RES(200, "Successfull !", true));
                })
                .catch((e) => {
                  res.json(RES(403, "Error Assigned 4 !"));
                });
            } else {
              res.json(RES(403, "Unknown Data 3 !"));
            }
          } else {
            res.json(RES(403, "Error Assigned 2 !"));
          }
        })
        .catch((e) => {
          res.json(RES(403, "Error Assigned 1 !"));
        });
    })
    .catch((e) => {
      res.json(RES(403, "Error 5 !"));
    });
};

module.exports.resolve = (req, res, next) => {
  var id = req.params.id;
  Assigned.findOne({
    where: {
      panicId: id,
    },
  })
    .then((result) => {
      result.responder_status = 1;
      result.save();
      Panic.findOne({ where: { id: result.panicId } })
        .then((response2) => {
          response2.statusId = 5; // Resolve Status
          response2.save();
          // Firebase
          fire("PanicAlarmUser", "Congratulations", "Panic Resolved");
          res.json(RES(200, "Successfull !", TRUE));
        })
        .catch((e) => {
          res.json(RES(200, "Error !"));
        });
    })
    .catch((e) => {
      res.json(RES(403, "Error !"));
    });
};

module.exports.close = (req, res, next) => {
  var id = req.params.id;
  var info = null;
  if (req.body.param) {
    info = req.body.param;
  } else {
    info = req.body;
  }
  Panic.findAll({ where: { id: id } })
    .then((response2) => {
      if (response2.length > 0) {
        response2[0].statusId = 6; // Close Status
        response2[0].remarks = info.remarks; // Comments by the Supervisor
        response2[0].closedBy = info.by; // Id of Supervisor
        response2[0].save();
        fire("PanicAlarmUser", "Congratulations", "Panic Resolved");
        res.json(RES(200, "Successfull !", TRUE));
      } else {
        res.json(RES(200, "Resembling Panic Not Found !"));
      }
    })
    .catch((e) => {
      res.json(RES(200, "Error !"));
    });
};
