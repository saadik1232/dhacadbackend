/**
 * API Response Standard Format
 */
var RES = require("../helpers/utils").response;
let { red, yellow, green } = require("colors");

/**
 * Importing Panic Database Model
 */
const Panic = require("./../models/panic");

var twilio = require("twilio");

/**
 * Importing Panic Database Model
 */
const User = require("./../models/user");
const Nature = require("./../models/nature");
const Priority = require("./../models/priority");

/**
 * Importing Data Validator
 */
const { CheckIfEmpty } = require("./../helpers/utils");

/**
 * Importing Logs Helper
 */
const { logs } = require("./../helpers/logs");
const { addPanicLogs } = require("./../helpers/panicLogs");
const { addLogs } = require("./../helpers/notificationLogs");
const { getDistance } = require("geolib");

/**
 * Importing Logs Helper
 */
const { fire, ind } = require("./../helpers/fire");
const { twilioMessage } = require("./../helpers/twilio");
const e = require("express");

/**
 * Method to get sorted panics my method
 */
module.exports.getSortedPanics = async (req, res, next) => {
  var allpanics = [];
  var panic = await Panic.findAll({
    include: [Nature, Priority],
  });
  if (panic) {
    logs("Panic", "Fetched All");
    allpanics = panic.filter(function (panic) {
      return panic.panicType === req.body.panicType;
    });
    var sort = allpanics.filter(function (panic) {
      return panic.contact === req.body.contact;
    });
    var sorted_panics = sort.sort(function (a, b) {
      return b.id - a.id;
    });
    res.json(RES(200, "Success", sorted_panics));
  } else res.json(RES(403, "SQL Error"));
};

// module.exports.getSortedPanics = async (req, res, next) => {
//   var allpanics = [];
//   allpanics = await Panic.findAll({
//     include: [Nature, Priority],
//   });
//   if (allpanics) {
//     var panic = allpanics.filter(function (panic) {
//       return panic.panicType === req.body.panicType;
//     });
//     // logs("Panic", "Fetched All");
//     res.json(RES(200, "Success", panic));
//   } else res.json(RES(403, "SQL Error"));
// };
/**
 * Method to Add a New Panic
 */
module.exports.create = async (req, res, next) => {
  var id = req.params.id || 0;
  if (
    CheckIfEmpty(req.body.lat) &&
    CheckIfEmpty(req.body.lng) &&
    CheckIfEmpty(req.body.address) &&
    CheckIfEmpty(req.body.contact) &&
    CheckIfEmpty(req.body.natureId) &&
    CheckIfEmpty(req.body.priorityId)
  ) {
    req.body.custId = req.body.custId || null;
    //res.json(RES(200, "Panic Creation Success", created));
    let user = await User.findOne({
      where: { contact: req.body.contact },
    });
    // if (user) {
    let family = User.findAll({
      where: { custId: user.id },
    });
    // res.json(RES(200, "Sucess", user));
    let familyContacts = [];
    for (let i = 0; i < family.length; i++) {
      familyContacts.push(family[i].contact);
    }
    let panic = await Panic.findOne({
      where: {
        contact: [user.contact],
        isCancelled: [null, 0],
        isClose: [null, 0],
        statusId: [1],
      },
    });
    if (user.roleId == 6) {
      var user2 = await User.findOne({
        where: { id: user.custId },
      });
      var panic2 = await Panic.findOne({
        where: {
          contact: [user2.contact],
          isCancelled: [null, 0],
        },
      });
      if (panic2) {
        ind(
          user.fcmToken,
          // res.json(RES(200, "ok", responder));
          "Panic Already Generated",
          `Request already in process sent by +92${user2.contact} `,
          {
            // panic: JSON.stringify(panic),
            // id: JSON.stringify(panic.id),
            // // lat: JSON.stringify(panic.lat),
            // lat: panic.lat,
            // lng: panic.lng,
            // address: panic.address,
            // contact: panic.contact,
            // KeyIntent: "New Panic ",
          },
          (detail) => {
            console.log("Done !");
          }
        );
        res.json(RES(403, "Request already in process"));
      }
    } else {
      //   res.json(RES(403, "User Not Found !"));
      // }
    }
    // res.json(RES(403, "Debug", { panic, user, family }));
    if (!panic) {
      if (req.body.isGSM == true) {
        twilioMessage(req.body.contact, "Panic has reached the system");
      }
      req.body.statusId = 1;
      req.body.isCancelled = false;
      // Operator
      let oprId = 0;
      let opr = await User.findAll({ where: { userActivation: 1, roleId: 3 } });
      let spr = await User.findAll({
        where: { userActivation: 1, roleId: 2 },
      });
      // res.json(RES(200, "Debugg", opr));
      if (opr.length > 0 && spr.length > 0) {
        oprId = opr[0].id;
        sprId = spr[0].id;
        req.body.operatorInvolved = oprId;
        req.body.supervisorInvolved = sprId;
        var created = await Panic.create({ ...req.body });
        if (created) {
          ind(
            user.fcmToken,
            "Alert Request has reached Security Office",
            "Help on the Way.",
            {
              // firstname: responder.firstname,
              // lastname: responder.lastname,
              // deviceId: JSON.stringify(responder.deviceId),
              // KeyIntent: "Responder Assigned by System",
            },
            (detail) => {
              console.log("Done !");
            }
          );
          addLogs(
            "Alert Request has reached Security Office Operator",
            "Help on the Way.",
            oprId,
            opr[0].firstname,
            user.id,
            user.firstname,
            {}
          );
          // res.json(RES(200, "Sucess"));
          res.json(RES(200, "Panic Creation Success", created));
          await addPanicLogs(
            created.id,
            oprId,
            sprId,
            0,
            user.groupId,
            "New Panic Created"
          );
        } else res.json(RES(403, "Panic Creation Failed"));
      } else {
        if (opr.length > 0) {
          oprId = opr[0].id;
          req.body.operatorInvolved = oprId;
          // console.log(green("Operator ID: " + oprId));
          // console.log(green("Customer ID: " + user.id));
          var created = await Panic.create({ ...req.body });
          if (created) {
            ind(
              user.fcmToken,
              "Alert Request has reached Security Office",
              "Help on the Way.",
              {
                // firstname: responder.firstname,
                // lastname: responder.lastname,
                // deviceId: JSON.stringify(responder.deviceId),
                // KeyIntent: "Responder Assigned by System",
              },
              (detail) => {
                console.log("Done !");
              }
            );
            addLogs(
              "Alert Request has reached Security Office Operator",
              "Help on the Way.",
              oprId,
              opr[0].firstname,
              user.id,
              user.firstname,
              {}
            );
            // res.json(RES(200, "Sucess"));
            // res.json(RES(200, "Panic Creation Success", created));
            await addPanicLogs(
              created.id,
              oprId,
              0,
              0,
              user.groupId,
              "New Panic Created"
            );
            res.json(RES(200, "Panic Creation Success", created));
          } else res.json(RES(403, "Panic Creation Failed"));
        } else {
          if (spr.length > 0) {
            sprId = spr[0].id;
            req.body.supervisorInvolved = sprId;
            // console.log(green("Operator ID: " + oprId));
            // console.log(green("Customer ID: " + user.id));
            var created = await Panic.create({ ...req.body });
            if (created) {
              ind(
                user.fcmToken,
                "Alert Request has reached Security Office",
                "Help on the Way.",
                {
                  // firstname: responder.firstname,
                  // lastname: responder.lastname,
                  // deviceId: JSON.stringify(responder.deviceId),
                  // KeyIntent: "Responder Assigned by System",
                },
                (detail) => {
                  console.log("Done !");
                }
              );
              addLogs(
                "Alert Request has reached Security Office Operator",
                "Help on the Way.",
                sprId,
                spr[0].firstname,
                user.id,
                user.firstname,
                {}
              );
              // res.json(RES(200, "Sucess"));
              await addPanicLogs(
                created.id,
                0,
                sprId,
                0,
                user.groupId,
                "New Panic Created"
              );
              res.json(RES(200, "Panic Creation Success", created));
            } else res.json(RES(403, "Panic Creation Failed"));
          } else {
            res.json(RES(403, "No Operator or Supervisor is Available !"));
          }
        }
      }
    } else {
      res.json(RES(403, "Panic  Already Exists"));
    }
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Update a Specific Panic
 */
module.exports.update = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id || req.body.id)) {
    var panic = await Panic.findOne({
      where: { id: req.params.id || req.body.id },
    });
    if (panic) {
      if (
        req.body.supervisorInvolved &&
        req.body.operatorInvolved == 0 &&
        statusId == 1
      ) {
        addPanicLogs(
          panic.id,
          panic.operatorInvolved,
          panic.supervisorInvolved,
          0,
          "Panic Assigned to Supervisor"
        );
      }
      if (req.body.isCancelled) {
        addPanicLogs(
          panic.id,
          panic.operatorInvolved,
          panic.supervisorInvolved,
          panic.responderInvolved,
          "Panic Cancelled by Customer"
        );
      }
      panic.update({ ...req.body });
      // logs("Panic", "Panic ( " + req.params.id + " ) Updated");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "No Data Matched"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Remove a Specific Panic
 */
module.exports.remove = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id)) {
    var panic = await Panic.destroy({ where: { id: req.params.id } });
    if (panic) {
      logs("Panic", "Panic ( " + req.params.id + " ) Deleted");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "Deletion Error"));
  } else res.json(RES(403, "Parameter Not Found"));
};

/**
 * Method to Fetch all Panic from the Database
 */
module.exports.fetchAll = async (req, res, next) => {
  var panic = await Panic.findAll({
    include: [Nature, Priority],
  });
  if (panic) {
    logs("Panic", "Fetched All");
    res.json(RES(200, "Success", panic));
  } else res.json(RES(403, "SQL Error"));
};

/**
 * Method to Fetch Single Panic from the Database
 */
module.exports.fetchSingle = async (req, res, next) => {
  var panic = await Panic.findOne({
    where: {
      contact: req.body.contact,
      // responderInvolved: [!0, !null],
      isCancelled: [0, null],
    },
  });
  if (panic) {
    var user = await User.findOne({
      where: { contact: panic.contact },
    });
    if (user) {
      res.json(RES(200, "Success", user));
    } else res.json(RES(403, "SQL Error"));
  } else res.json(RES(403, "SQL Error 2"));
};

/**
 * Method to Fetch all Cancelled Panic from the Database
 */
module.exports.fetchCancelled = async (req, res, next) => {
  var panic = await Panic.findAll({ where: { isCancelled: true } });
  if (panic) {
    logs("Panic", "Fetched All Cancelled");
    res.json(RES(200, "Success", panic));
  } else res.json(RES(403, "SQL Error"));
};

/**
 * Method to Fetch all Panic Except Cancelled from the Database
 */
module.exports.fetchExceptCancelled = async (req, res, next) => {
  var panic = await Panic.findAll({ where: { isCancelled: false } });
  if (panic) {
    logs("Panic", "Fetched All Except Cancelled");
    res.json(RES(200, "Success", panic));
  } else res.json(RES(403, "SQL Error"));
};

/**
 * Method to Fetch all In Query Panic from the Database
 */
module.exports.fetchInQuery = async (req, res, next) => {
  var panic = await Panic.findAll({
    where: { isCancelled: false, statusId: 1 },
  });
  if (panic) {
    logs("Panic", "Fetched All In Query");
    res.json(RES(200, "Success", panic));
  } else res.json(RES(403, "SQL Error"));
};

/**
 *
 */
module.exports.cancelPanic = async (req, res, next) => {
  if (CheckIfEmpty(req.body.id)) {
    var data = await Panic.findOne({ where: { id: req.body.id } });
    data.isCancelled = 1;
    data.save();
    var user = await User.findOne({ where: { contact: data.contact } });
    await ind(
      user.fcmToken,
      "Request Cancelled",
      "Your Panic is cancelled",
      {
        // firstname: responder.firstname,
        // lastname: responder.lastname,
        // deviceId: JSON.stringify(responder.trackingId),
        // KeyIntent: "Responder Assigned by System",
      },
      (detail) => {
        console.log("Done !");
      }
    );
    res.json(RES(200, "Success"));
  } else {
    res.json(RES(403, "Error. Id Not Provided"));
  }
};

/**
 * Method to Fetch all Panics confirmed by Operator from the Database
 */
module.exports.fetchConfirmedByOperator = async (req, res, next) => {
  var panic = await Panic.findAll({
    where: { isCancelled: false, statusId: 2 },
  });
  if (panic) {
    logs("Panic", "Fetched All Confirmed By Operator");
    res.json(RES(200, "Success", panic));
  } else res.json(RES(403, "SQL Error"));
};

/**
 * Method to Fetch all Panics Assigned to Responder  from the Database
 */
module.exports.fetchAssignedToResponder = async (req, res, next) => {
  var panic = await Panic.findAll({
    where: { isCancelled: false, statusId: 3 },
  });
  if (panic) {
    inde;
    logs("Panic", "Fetched All Assigned to Responder");
    res.json(RES(200, "Success", panic));
  } else res.json(RES(403, "SQL Error"));
};

/**
 * Method to Fetch all Panics Resolved By Responder from the Database
 */
module.exports.fetchResolvedByResponder = async (req, res, next) => {
  var panic = await Panic.findAll({
    where: { isCancelled: false, statusId: 4 },
  });
  if (panic) {
    logs("Panic", "Fetched All Resolved by Responder");
    res.json(RES(200, "Success", panic));
  } else res.json(RES(403, "SQL Error"));
};

/**
 * Method to Fetch all Panic from the Database
 */
module.exports.fetchResolvedByOperator = async (req, res, next) => {
  var panic = await Panic.findAll({
    where: { isCancelled: false, statusId: 5 },
  });
  if (panic) {
    logs("Panic", "Fetched All Resolved By Operator");
    res.json(RES(200, "Success", panic));
  } else res.json(RES(403, "SQL Error"));
};

/**
 * Method to Fetch all Panic from the Database
 */
module.exports.fetchClosedBySupervisor = async (req, res, next) => {
  var panic = await Panic.findAll({
    where: { isCancelled: false, statusId: 6 },
  });
  if (panic) {
    logs("Nature", "Fetched All Closed By Supervisor");
    res.json(RES(200, "Success", panic));
  } else res.json(RES(403, "SQL Error"));
};

/**
 * Panic Resolve
 */
module.exports.resolver = async (req, res, next) => {
  var user = await User.findOne({
    where: {
      roleId: 4,
      contact: req.body.id,
    },
  });
  if (user) {
    var panic = await Panic.findOne({ where: { responderInvolved: user.id } });
    if (panic) {
      if (panic.statusId == 3) {
        panic.statusId = 4;
        panic.save();
        var customer = await User.findOne({
          where: {
            roleId: 5,
            contact: panic.contact,
          },
        });
        if (customer) {
          ind(
            customer.fcmToken,
            "Panic Resolved",
            "Your Panic has been Resolved",
            {},
            (data) => {
              console.log("Done");
            }
          );
        } else {
          // res.json(RES(403, "Customer Credentials Error"));
        }
        res.json(RES(200, "Success"));
      }
    } else {
      res.json(RES(403, "Panic Credentials Error"));
    }
  } else {
    res.json(RES(403, "User Credentials Error"));
  }
};

/**
 * Twilio text
 */
module.exports.sendMessage = async (req, res, next) => {
  var accountSid = "AC3164788fff6b1fc268237a61e9f638fd"; // Your Account SID from www.twilio.com/console
  var authToken = "3cd1bf5ef607d36d9a83027a99196b5d"; // Your Auth Token from www.twilio.com/console

  // var twilio = require("twilio");
  var client = new twilio(accountSid, authToken);

  client.message
    .create({
      body: "This is the ship that made the Kessel Run in fourteen parsecs?",
      from: "+19362052967",
      to: req.body.contact,
    })
    .then((message) => console.log(message.sid));
  if (message) {
    res.json(RES(200, "Success"));
  } else {
    res.json(RES(403, "Credentials Error"));
  }
};

/**
 * Method to Assign Panic to a Operator
 */
module.exports.operatorAssignPanic = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id || req.body.id)) {
    var panic = await Panic.findOne({
      where: { id: req.params.id || req.body.id },
    });
    if (panic) {
      let user = User.findOne({
        where: { contact: panic.contact },
      });
      if (req.body.operatorInvolved && req.body.statusId == 1) {
        addPanicLogs(
          panic.id,
          panic.operatorInvolved,
          0,
          0,
          user.groupId,
          "Panic Assigned to Operator"
        );
      }
      panic.update({ ...req.body });
      // logs("Panic", "Panic ( " + req.params.id + " ) Updated");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "No Data Matched"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Assign Panic to a Supervisor
 */
module.exports.supervisorAssignPanic = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id || req.body.id)) {
    var panic = await Panic.findOne({
      where: { id: req.params.id || req.body.id },
    });
    if (panic) {
      let user = User.findOne({
        where: { contact: panic.contact },
      });
      if (req.body.supervisorInvolved && req.body.statusId == 1) {
        addPanicLogs(
          panic.id,
          panic.supervisorInvolved,
          0,
          0,
          user.groupId,
          "Panic Assigned to Supervisor"
        );
      }
      panic.update({ ...req.body });
      // logs("Panic", "Panic ( " + req.params.id + " ) Updated");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "No Data Matched"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method when Panic is accepted by an Operator
 */
module.exports.operatorAcceptPanic = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id || req.body.id)) {
    var panic = await Panic.findOne({
      where: { id: req.params.id || req.body.id },
    });
    if (panic) {
      let user = await User.findOne({
        where: { contact: panic.contact },
      });
      req.body.statusId = 2;
      if (panic.operatorInvolved && req.body.statusId == 2) {
        addPanicLogs(
          panic.id,
          panic.operatorInvolved,
          panic.supervisorInvolved,
          0,
          user.groupId,
          "Panic Accepted by Operator"
        );
      }
      if (panic.isGSM == true) {
        twilioMessage(
          panic.contact,
          "Panic has reached the system. Help will be on the way"
        );
      }
      panic.update({ ...req.body });
      // logs("Panic", "Panic ( " + req.params.id + " ) Updated");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "No Data Matched"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method when Panic is accepted by Supervisor
 */
module.exports.supervisorAcceptPanic = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id || req.body.id)) {
    var panic = await Panic.findOne({
      where: { id: req.params.id || req.body.id },
    });
    let user = User.findOne({
      where: { contact: panic.contact },
    });
    req.body.statusId = 2;
    if (panic) {
      if (
        (panic.operatorInvolved == 0 ||
          panic.operatorInvolved == "" ||
          panic.operatorInvolved == null) &&
        req.body.statusId == 2
      ) {
        // res.json(RES(200, "Success In"));
        addPanicLogs(
          panic.id,
          0,
          panic.supervisorInvolved,
          0,
          user.groupId,
          "Panic Accepted by Supervisor"
        );
      }
      if (panic.isGSM == true) {
        twilioMessage(
          panic.contact,
          "Panic has reached the system..help will be on the way"
        );
      }
      panic.update({ ...req.body });
      // logs("Panic", "Panic ( " + req.params.id + " ) Updated");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "No Data Matched"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method when Panic is assigned to Responder by Operator
 */
module.exports.operatorAssignPanicToRes = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id || req.body.id)) {
    var panic = await Panic.findOne({
      where: { id: req.params.id || req.body.id },
    });
    let user = await User.findOne({
      where: { contact: panic.contact },
    });
    req.body.statusId = 3;
    if (panic) {
      if (
        panic.operatorInvolved &&
        req.body.responderInvolved &&
        req.body.statusId == 3
      ) {
        addPanicLogs(
          panic.id,
          panic.operatorInvolved,
          panic.supervisorInvolved,
          req.body.responderInvolved,
          user.groupId,
          "Panic Assigned to Responder by Operator"
        );
      }
      if (req.body.responderInvolved && req.body.statusId == 3) {
        let responder = await User.findOne({
          where: { id: req.body.responderInvolved },
        });
        let customer = await User.findOne({
          where: { contact: panic.contact },
        });
        // res.json(RES(200, "Success", customer));
        let nature = await Nature.findOne({
          where: { id: panic.natureId },
        });
        let priority = await Priority.findOne({
          where: { id: panic.priorityId },
        });
        let operator = await User.findOne({
          where: { id: panic.operatorInvolved },
        });
        // res.json(RES(200, "Success", responder));
        // res.json(RES(200, "ok", customer));
        await ind(
          responder.fcmToken,
          // res.json(RES(200, "ok", responder));
          "New Assignment",
          "You have been Assigned by a new Panic Alert",
          {
            // panic: JSON.stringify(panic),
            id: JSON.stringify(panic.id),
            // lat: JSON.stringify(panic.lat),
            lat: panic.lat,
            lng: panic.lng,
            address: panic.address,
            contact: panic.contact,
            name: customer.firstname + customer.lastname,
            // custExtNumber: customer.extNumber,
            nature: nature.name,
            priority: priority.name,
            oprName: operator.firstname + operator.lastname,
            KeyIntent: "New Panic Generated",
          },
          (detail) => {
            console.log("Done !");
          }
        );
        await addLogs(
          "New Assignment",
          "You have been Assigned by a new Panic Alert",
          operator.id,
          operator.firstname,
          responder.id,
          responder.firstname,
          {
            id: JSON.stringify(panic.id),
            lat: panic.lat,
            lng: panic.lng,
            address: panic.address,
            contact: panic.contact,
            name: customer.firstname + customer.lastname,
            nature: nature.name,
            priority: priority.name,
            oprName: operator.firstname + operator.lastname,
            KeyIntent: "New Panic Generated",
          }
        );
        //
      }
      if (panic.isGSM == true) {
        twilioMessage(
          panic.contact,
          "Help on the way..Panic is assigned to responder"
        );
      }
      panic.update({ ...req.body });
      // logs("Panic", "Panic ( " + req.params.id + " ) Updated");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "No Data Matched"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method when Panic is assigned to Responder by Supervisor
 */
module.exports.supervisorAssignPanicToOpr = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id || req.body.id)) {
    var panic = await Panic.findOne({
      where: { id: req.params.id || req.body.id },
    });
    let user = await User.findOne({
      where: { contact: panic.contact },
    });
    req.body.statusId = 1;
    if (panic) {
      if (
        panic.supervisorInvolved &&
        req.body.operatorInvolved &&
        req.body.statusId == 1
      ) {
        // res.json(RES(200, "Success In"));
        await addPanicLogs(
          panic.id,
          req.body.operatorInvolved,
          panic.supervisorInvolved,
          0,
          user.groupId,
          "Panic Assigned to Operator by Supervisor"
        );
      }
      panic.update({ ...req.body });
      // logs("Panic", "Panic ( " + req.params.id + " ) Updated");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "No Data Matched"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method when Panic is assigned to Responder by Supervisor
 */
module.exports.supervisorAssignPanicToRes = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id || req.body.id)) {
    var panic = await Panic.findOne({
      where: { id: req.params.id || req.body.id },
    });
    let user = await User.findOne({
      where: { contact: panic.contact },
    });
    // res.json(RES(200, "Success In", user));
    req.body.statusId = 3;
    if (panic) {
      if (
        panic.supervisorInvolved &&
        panic.operatorInvolved == 0 &&
        req.body.responderInvolved &&
        req.body.statusId == 3
      ) {
        addPanicLogs(
          panic.id,
          0,
          panic.supervisorInvolved,
          req.body.responderInvolved,
          user.groupId,
          "Panic Assigned to Responder by Supervisor"
        );
      }
      if (req.body.responderInvolved && req.body.statusId == 3) {
        let responder = await User.findOne({
          where: { id: req.body.responderInvolved },
        });
        let customer = await User.findOne({
          where: { contact: panic.contact },
        });
        // res.json(RES(200, "Success", customer));
        let nature = await Nature.findOne({
          where: { id: panic.natureId },
        });
        let priority = await Priority.findOne({
          where: { id: panic.priorityId },
        });
        let supervisor = await User.findOne({
          where: { id: panic.supervisorInvolved },
        });
        // res.json(RES(200, "Success", responder));
        // res.json(RES(200, "ok", customer));
        await ind(
          responder.fcmToken,
          // res.json(RES(200, "ok", responder));
          "New Assignment",
          "You have been Assigned by a new Panic Alert",
          {
            // panic: JSON.stringify(panic),
            id: JSON.stringify(panic.id),
            // lat: JSON.stringify(panic.lat),
            lat: panic.lat,
            lng: panic.lng,
            address: panic.address,
            contact: panic.contact,
            name: customer.firstname + customer.lastname,
            // custExtNumber: customer.extNumber,
            nature: nature.name,
            priority: priority.name,
            suprvisorName: supervisor.firstname + supervisor.lastname,
            KeyIntent: "New Panic Generated",
          },
          (detail) => {
            console.log("Done !");
          }
        );
        await addLogs(
          "New Assignment",
          "You have been Assigned by a new Panic Alert",
          supervisor.id,
          supervisor.firstname,
          responder.id,
          responder.firstname,
          {
            id: JSON.stringify(panic.id),
            lat: panic.lat,
            lng: panic.lng,
            address: panic.address,
            contact: panic.contact,
            name: customer.firstname + customer.lastname,
            nature: nature.name,
            priority: priority.name,
            suprvisorName: supervisor.firstname + supervisor.lastname,
            KeyIntent: "New Panic Generated",
          }
        );
        //
      }
      if (panic.isGSM == true) {
        twilioMessage(
          panic.contact,
          "Help on the way..Panic is assigned to responder"
        );
      }
      panic.update({ ...req.body });
      // logs("Panic", "Panic ( " + req.params.id + " ) Updated");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "No Data Matched"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method when Panic is Resolved by the Responder
 */
module.exports.responderSolvePanic = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id || req.body.id)) {
    var panic = await Panic.findOne({
      where: { id: req.params.id || req.body.id },
    });
    let user = User.findOne({
      where: { contact: panic.contact },
    });
    req.body.statusId = 3;
    if (panic) {
      if (
        panic.supervisorInvolved &&
        panic.operatorInvolved == 0 &&
        req.body.responderInvolved &&
        req.body.statusId == 3
      ) {
        addPanicLogs(
          panic.id,
          0,
          panic.supervisorInvolved,
          req.body.responderInvolved,
          user.groupId,
          "Panic Assigned to Responder by Supervisor"
        );
      }
      if (req.body.responderInvolved && req.body.statusId == 3) {
        let responder = await User.findOne({
          where: { id: req.body.responderInvolved },
        });
        let customer = await User.findOne({
          where: { contact: panic.contact },
        });
        // res.json(RES(200, "Success", customer));
        let nature = await Nature.findOne({
          where: { id: panic.natureId },
        });
        let priority = await Priority.findOne({
          where: { id: panic.priorityId },
        });
        let supervisor = await User.findOne({
          where: { id: panic.supervisorInvolved },
        });
        // res.json(RES(200, "Success", responder));
        // res.json(RES(200, "ok", customer));
        await ind(
          responder.fcmToken,
          // res.json(RES(200, "ok", responder));
          "New Assignment",
          "You have been Assigned by a new Panic Alert",
          {
            // panic: JSON.stringify(panic),
            id: JSON.stringify(panic.id),
            // lat: JSON.stringify(panic.lat),
            lat: panic.lat,
            lng: panic.lng,
            address: panic.address,
            contact: panic.contact,
            name: customer.firstname + customer.lastname,
            nature: nature.name,
            priority: priority.name,
            suprvisorName: supervisor.firstname + supervisor.lastname,
            KeyIntent: "New Panic Generated",
          },
          (detail) => {
            console.log("Done !");
          }
        );
        await addLogs(
          "New Assignment",
          "You have been Assigned by a new Panic Alert",
          supervisor.id,
          supervisor.firstname,
          responder.id,
          responder.firstname,
          {
            id: JSON.stringify(panic.id),
            lat: panic.lat,
            lng: panic.lng,
            address: panic.address,
            contact: panic.contact,
            name: customer.firstname + customer.lastname,
            nature: nature.name,
            priority: priority.name,
            suprvisorName: supervisor.firstname + supervisor.lastname,
            KeyIntent: "New Panic Generated",
          }
        );
        //
      }
      panic.update({ ...req.body });
      // logs("Panic", "Panic ( " + req.params.id + " ) Updated");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "No Data Matched"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method when Panic is accepted by Responder
 */
module.exports.responderAcceptPanic = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id || req.body.id)) {
    var panic = await Panic.findOne({
      where: { id: req.params.id || req.body.id },
    });
    let user = await User.findOne({
      where: { contact: panic.contact },
    });
    req.body.statusId = 7;
    if (panic) {
      if (panic.responderInvolved && req.body.statusId == 7) {
        addPanicLogs(
          panic.id,
          panic.operatorInvolved,
          panic.supervisorInvolved,
          panic.responderInvolved,
          user.groupId,
          "Panic Accepted by Responder"
        );
      }
      if (panic.responderInvolved && req.body.statusId == 7) {
        let responder = await User.findOne({
          where: { id: panic.responderInvolved },
        });
        let customer = await User.findOne({
          where: { contact: panic.contact },
        });
        await ind(
          customer.fcmToken,
          "Responder Assigned to your Request",
          "Help on the Way. Will reach you in  Mins",
          {
            firstname: responder.firstname,
            lastname: responder.lastname,
            deviceId: JSON.stringify(responder.trackingId),
            KeyIntent: "Responder Assigned by System",
          },
          (detail) => {
            console.log("Done !");
          }
        );
        await addLogs(
          "Responder Assigned to your Request",
          "Help on the Way. Will reach you in  Mins",
          responder.id,
          responder.firstname,
          customer.id,
          customer.firstname,
          {
            firstname: responder.firstname,
            lastname: responder.lastname,
            deviceId: JSON.stringify(responder.trackingId),
            KeyIntent: "Responder Assigned by System",
          }
        );
        if (panic.isGSM) {
          await twilioMessage(
            customer.contact,
            "Help is on the WAY",
            (detail) => {
              console.log("Done!");
            }
          );
        }
        // res.json(RES(200, "Success"));
      }
      panic.update({ ...req.body });
      // logs("Panic", "Panic ( " + req.params.id + " ) Updated");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "No Data Matched"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method when Panic is resolved by Responder
 */
module.exports.responderResolvePanic = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id || req.body.id)) {
    var panic = await Panic.findOne({
      where: { id: req.params.id || req.body.id },
    });
    let user = User.findOne({
      where: { contact: panic.contact },
    });
    req.body.statusId = 4;
    if (panic) {
      if (panic.responderInvolved && req.body.statusId == 4) {
        addPanicLogs(
          panic.id,
          panic.operatorInvolved,
          panic.supervisorInvolved,
          panic.responderInvolved,
          user.groupId,
          "Panic Resolved by Responder"
        );
      }
      if (panic.responderInvolved && req.body.statusId == 4) {
        // res.json(RES(200, "Success"));
        let customer = await User.findOne({
          where: { contact: panic.contact },
        });
        let responder = await User.findOne({
          where: { id: panic.responderInvolved },
        });
        await ind(
          customer.fcmToken,
          "Panic Alert Resolve",
          "Your Panic has been Resolved by the Responder",
          {
            // firstname: responder.firstname,
            // lastname: responder.lastname,
            // KeyIntent: "Panic Resolved",
          },
          (detail) => {
            console.log("Done !");
          }
        );
        await addLogs(
          "Panic Alert Resolve",
          "Your Panic has been Resolved by the Responder",
          responder.id,
          responder.firstname,
          customer.id,
          customer.firstname,
          {}
        );
      }
      panic.update({ ...req.body });
      // logs("Panic", "Panic ( " + req.params.id + " ) Updated");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "No Data Matched"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method when Panic is resolved by Operator
 */
module.exports.operatorResolvePanic = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id || req.body.id)) {
    var panic = await Panic.findOne({
      where: { id: req.params.id || req.body.id },
    });
    let user = await User.findOne({
      where: { contact: panic.contact },
    });
    req.body.statusId = 5;
    if (panic) {
      if (panic.operatorInvolved && req.body.statusId == 5) {
        addPanicLogs(
          panic.id,
          panic.operatorInvolved,
          panic.supervisorInvolved,
          panic.responderInvolved,
          user.groupId,
          "Panic Resolved by Operator"
        );
      }
      panic.update({ ...req.body });
      // logs("Panic", "Panic ( " + req.params.id + " ) Updated");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "No Data Matched"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method when Panic is resolved by Supervisor
 */
module.exports.supervisorResolvePanic = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id || req.body.id)) {
    var panic = await Panic.findOne({
      where: { id: req.params.id || req.body.id },
    });
    let user = await User.findOne({
      where: { contact: panic.contact },
    });
    req.body.statusId = 6;
    if (panic) {
      if (panic.supervisorInvolved && req.body.statusId == 6) {
        addPanicLogs(
          panic.id,
          panic.operatorInvolved,
          panic.supervisorInvolved,
          panic.responderInvolved,
          user.groupId,
          "Panic Resolved by Supervisor"
        );
      }
      if (req.body.statusId == 6) {
        // res.json(RES(200, "Success"));
        let panic = await Panic.findOne({
          where: { id: req.body.id },
        });
        // res.json(RES(200, "Success"));
        let responder = await User.findOne({
          where: { id: panic.responderInvolved },
        });
        // res.json(RES(200, "Success", responder));
        let customer = await User.findOne({
          where: { contact: panic.contact },
        });
        let supervisor = await User.findOne({
          where: { id: panic.supervisorInvolved },
        });
        await ind(
          customer.fcmToken,
          "Your request has been addressed",
          "Your Panic has been Resolved by the System",
          {
            firstname: responder.firstname,
            lastname: responder.lastname,
            KeyIntent: "Panic Resolved",
          },
          (detail) => {
            console.log("Done !");
          }
        );
        await addLogs(
          "Your request has been addressed",
          "Your Panic has been Resolved by the System",
          supervisor.id,
          supervisor.firstname,
          customer.id,
          customer.firstname,
          {}
        );
      }
      panic.update({ ...req.body });
      // logs("Panic", "Panic ( " + req.params.id + " ) Updated");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "No Data Matched"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Close a Panic in Case of False Alarm
 */
module.exports.closePanic = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id || req.body.id)) {
    var panic = await Panic.findOne({
      where: { id: req.params.id || req.body.id },
    });
    let user = await User.findOne({
      where: { contact: panic.contact },
    });
    req.body.isClose = true;
    if (panic) {
      let supervisor = await User.findOne({
        where: { id: panic.supervisorInvolved },
      });
      if (req.body.isClose) {
        if (panic.responderInvolved) {
          let responder = await User.findOne({
            where: { id: panic.responderInvolved },
          });
          await ind(
            responder.fcmToken,
            "False Alarm",
            "Panic Closed",
            {
              KeyIntent: "Panic is Closed",
            },
            (detail) => {
              console.log("Done !");
            }
          );
          // res.json(RES(200, "Success", supervisor));
          // await addLogs(
          //   "False Alarm",
          //   "Panic Closed",
          //   supervisor.id,
          //   supervisor.firstname,
          //   responder.id,
          //   responder.firstname,
          //   {
          //     KeyIntent: "Panic is Closed",
          //   }
          // );
        }
        res.json(RES(200, "Successful"));
        let customer = await User.findOne({
          where: { contact: panic.contact },
        });
        await ind(
          customer.fcmToken,
          "False Alarm",
          "Panic Closed",
          {
            // firstname: responder.firstname,
            // lastname: responder.lastname,
            KeyIntent: "Panic Closed",
          },
          (detail) => {
            console.log("Done !");
          }
        );
        // addLogs(
        //   "False Alarm",
        //   "Panic Closed",
        //   supervisor.id,
        //   supervisor.firstname,
        //   customer.id,
        //   customer.firstname,
        //   {
        //     KeyIntent: "Panic is Closed",
        //   }
        // );
      }
      if (panic.operatorInvolved || panic.supervisorInvolved) {
        addPanicLogs(
          panic.id,
          req.body.userId ? req.body.userId : panic.operatorInvolved,
          req.body.userId ? req.body.userId : panic.supervisorInvolved,
          panic.responderInvolved,
          user.groupId,
          "Panic Closed - False Alarm"
        );
      }
      panic.update({ ...req.body });
      // logs("Panic", "Panic ( " + req.params.id + " ) Updated");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "No Data Matched"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Close a Panic in Case of Completely Solved Panic
 */
module.exports.solvePanic = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id || req.body.id)) {
    var panic = await Panic.findOne({
      where: { id: req.params.id || req.body.id },
    });
    let user = await User.findOne({
      where: { contact: panic.contact },
    });
    req.body.statusId = 9;
    req.body.isResolved = true;
    if (panic) {
      if (req.body.isResolved && req.body.statusId == 9) {
        addPanicLogs(
          panic.id,
          panic.operatorInvolved,
          panic.supervisorInvolved,
          panic.responderInvolved,
          user.groupId,
          "Panic is Solved"
        );
      }
      if (panic.isGSM == true) {
        twilioMessage(panic.contact, "Panic is solved");
      }
      panic.update({ ...req.body });
      // logs("Panic", "Panic ( " + req.params.id + " ) Updated");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "No Data Matched"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Close a Panic by Customer with Rating
 */
module.exports.closePanicByCustomer = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id || req.body.id)) {
    var panic = await Panic.findOne({
      where: { id: req.params.id || req.body.id },
    });
    let user = await User.findOne({
      where: { contact: panic.contact },
    });
    req.body.statusId = 8;
    if (panic) {
      if (req.body.customerRating && req.body.statusId == 8) {
        addPanicLogs(
          panic.id,
          panic.operatorInvolved,
          panic.supervisorInvolved,
          panic.responderInvolved,
          user.groupId,
          "Panic Solved and Rating is given by Customer"
        );
      }
      panic.update({ ...req.body });
      // logs("Panic", "Panic ( " + req.params.id + " ) Updated");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "No Data Matched"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method when Panic is Not accepted by an Operator
 */
module.exports.operatorNotAcceptPanic = async (req, res, next) => {
  if (CheckIfEmpty(req.params.id || req.body.id)) {
    var panic = await Panic.findOne({
      where: { id: req.params.id || req.body.id },
    });
    if (panic) {
      // panic.statusId = 1;
      // panic.operatorInvolved = null;
      // panic.supervisorInvolved = 5;
      let newObject = {
        statusId: 1,
        operatorInvolved: null,
        supervisorInvolved: 5,
      };
      await panic.update({ ...newObject });
      await addPanicLogs(
        panic.id,
        newObject.operatorInvolved,
        newObject.supervisorInvolved,
        0,
        0,
        "Panic Not Accepted By Operator - Redirected to Supervisor"
      );
      res.json(RES(200, "Success", panic));
    } else res.json(RES(403, "No Data Matched"));
  } else res.json(RES(403, "Credentials Error"));
};
