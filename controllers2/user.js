/**
 * API Response Standard Format
 */
var RES = require("../helpers/utils").response;

/**
 * Importing User Database Model
 */
const User = require("./../models/user");

/**
 * Importing Role Database Model
 */
const Role = require("./../models/role");

/**
 * Importing Data Validator
 */
const { CheckIfEmpty } = require("./../helpers/utils");

/**
 * Custom Helpers
 */
const { fire, ind } = require("../helpers/fire");

/**
 * Importing Logs Helper
 */
const { logs } = require("./../helpers/logs");
const { addLogs } = require("./../helpers/notificationLogs");

/**
 * Importing Json Web Token Library
 */
const jwt = require("jsonwebtoken");

/**
 * Importing JWT Token Decoding Encoding KEY
 */
const { KEY, Min } = require("./../configs/jwt");

module.exports.customerRegister = async (req, res, next) => {
  // if (
  // CheckIfEmpty(req.body.firstname) &&
  // CheckIfEmpty(req.body.lastname) &&
  // CheckIfEmpty(req.body.cnic) &&
  // CheckIfEmpty(req.body.contact) &&
  // CheckIfEmpty(req.body.email) &&
  // CheckIfEmpty(req.body.password) &&
  // CheckIfEmpty(req.body.lat) &&
  // CheckIfEmpty(req.body.lng) &&
  // CheckIfEmpty(req.body.city) &&
  // CheckIfEmpty(req.body.street) &&
  // CheckIfEmpty(req.body.house) &&
  // CheckIfEmpty(req.body.town) &&
  //   CheckIfEmpty(req.body.deviceId) &&
  //   CheckIfEmpty(req.body.mapAddress) &&
  //   CheckIfEmpty(req.body.fcmToken)
  // )
  req.body.userActivation = true;
  req.body.userAssignment = 0;
  req.body.approval = false;
  req.body.roleId = 5;
  // req.body.serviceId = 1;
  req.body.subscriptionId = null;
  req.body.image = req.body.image | "";
  req.body.cnic = req.body.cnic | "";
  req.body.deviceId = null;
  req.body.fcmToken = req.body.fcmToken || null;
  req.body.forgetToken = null;
  req.body.userToken = null;
  req.body.uniqueId = null;
  req.body.trackingId = null;
  req.body.password = req.body.password || "" || null;
  // req.body.userToken = await jwt.sign({ user: { ...req.body } }, KEY, {
  //   expiresIn: 60 * Min,
  // });
  try {
    var created = await User.create({ ...req.body });
    // res.json(RES(200, "Customer Registration Success"));
    if (created) {
      logs("Customer ", " New Customer Registered ");
      res.json(RES(200, "Customer has been Registered Successfully", created));
    } else res.json(RES(403, "Customer Registeration Failed"));
  } catch (e) {
    res.json(RES(403, "Registeration Error", e));
  }
};

module.exports.operatorRegister = async (req, res, next) => {
  if (
    CheckIfEmpty(req.body.firstname) &&
    CheckIfEmpty(req.body.lastname) &&
    // CheckIfEmpty(req.body.cnic) &&
    CheckIfEmpty(req.body.contact) &&
    CheckIfEmpty(req.body.email) &&
    CheckIfEmpty(req.body.password)
    // CheckIfEmpty(req.body.lat) &&
    // CheckIfEmpty(req.body.lng) &&
    // CheckIfEmpty(req.body.city) &&
    // CheckIfEmpty(req.body.street) &&
    // CheckIfEmpty(req.body.house) &&
    // CheckIfEmpty(req.body.town) &&
    // CheckIfEmpty(req.body.deviceId) &&
    // CheckIfEmpty(req.body.mapAddress) &&
    // CheckIfEmpty(req.body.fcmToken)
  ) {
    // res.json(RES("Check: ", { ...req.body }));
    // res.json(RES("Check"));
    req.body.userActivation = req.body.userActivation || null;
    req.body.userAssignment = req.body.userAssignment || 0;
    req.body.approval = req.body.approval || false;
    req.body.roleId = 3;
    // req.body.serviceId = 1;
    req.body.subscriptionId = req.body.subscriptionId || null;
    req.body.image = req.body.image | "";
    req.body.deviceId = req.body.deviceId || null;
    req.body.fcmToken = req.body.fcmToken || null;
    req.body.forgetToken = req.body.forgetToken || null;
    req.body.userToken = req.body.userToken || null;
    req.body.uniqueId = req.body.uniqueId || null;
    req.body.groupId = req.body.groupId || null;
    req.body.block = req.body.block || null;
    req.body.subscriptionExpiry = req.body.subscriptionExpiry || null;
    req.body.subscriptionDuration = req.body.subscriptionDuration || null;
    req.body.mapAddress = req.body.mapAddress || null;
    req.body.trackingId = null;
    req.body.password = req.body.password || "" || null;
    var created = await User.create({ ...req.body });
    if (created) {
      logs("Operator", " New Operator User Registered ");
      res.json(RES(200, "Operator Registration Success", created));
    } else res.json(RES(403, "Operator Registeration Failed"));
  }
};

module.exports.adminRegister = async (req, res, next) => {
  if (
    CheckIfEmpty(req.body.firstname) &&
    CheckIfEmpty(req.body.lastname) &&
    // CheckIfEmpty(req.body.cnic) &&
    CheckIfEmpty(req.body.contact) &&
    CheckIfEmpty(req.body.email) &&
    CheckIfEmpty(req.body.password)
    // CheckIfEmpty(req.body.lat) &&
    // CheckIfEmpty(req.body.lng) &&
    // CheckIfEmpty(req.body.city) &&
    // CheckIfEmpty(req.body.street) &&
    // CheckIfEmpty(req.body.house) &&
    // CheckIfEmpty(req.body.town) &&
    // CheckIfEmpty(req.body.deviceId) &&
    // CheckIfEmpty(req.body.mapAddress) &&
    // CheckIfEmpty(req.body.fcmToken)
  ) {
    // res.json(RES("Check: ", { ...req.body }));
    req.body.userActivation = req.body.userActivation || null;
    req.body.userAssignment = req.body.userAssignment || 0;
    req.body.approval = req.body.approval || false;
    req.body.roleId = 1;
    // req.body.serviceId = 1;
    req.body.subscriptionId = req.body.subscriptionId || null;
    req.body.image = req.body.image | "";
    req.body.deviceId = req.body.deviceId || null;
    req.body.fcmToken = req.body.fcmToken || null;
    req.body.forgetToken = req.body.forgetToken || null;
    req.body.userToken = req.body.userToken || null;
    req.body.uniqueId = req.body.uniqueId || null;
    req.body.groupId = req.body.groupId || null;
    req.body.block = req.body.block || null;
    req.body.subscriptionExpiry = req.body.subscriptionExpiry || null;
    req.body.subscriptionDuration = req.body.subscriptionDuration || null;
    req.body.mapAddress = req.body.mapAddress || null;
    req.body.trackingId = null;
    req.body.password = req.body.password || "" || null;
    // req.body.userToken = await jwt.sign({ user: { ...req.body } }, KEY, {
    //   expiresIn: 60 * Min,
    // });
    try {
      // res.json(RES("Check1", req.body));
      var created = await User.create({ ...req.body });
      // res.json(RES(200, "Customer Registration Success"));
      if (created) {
        logs("Customer", " New Admin Registered ");
        res.json(RES(200, "Admin has been Registered Successfully", created));
      } else res.json(RES(403, "Admin Registeration Failed"));
    } catch (e) {
      res.json(RES(403, "Registeration Error", e));
    }
  }
};

module.exports.superAdminRegister = async (req, res, next) => {
  req.body.userActivation = req.body.userActivation || null;
  req.body.userAssignment = req.body.userAssignment || 0;
  req.body.approval = req.body.approval || false;
  req.body.roleId = 10;
  // req.body.serviceId = 1;
  req.body.subscriptionId = req.body.subscriptionId || null;
  req.body.image = req.body.image | "";
  req.body.deviceId = req.body.deviceId || null;
  req.body.fcmToken = req.body.fcmToken || null;
  req.body.forgetToken = req.body.forgetToken || null;
  req.body.userToken = req.body.userToken || null;
  req.body.uniqueId = req.body.uniqueId || null;
  req.body.groupId = req.body.groupId || null;
  req.body.trackingId = null;
  req.body.password = req.body.password || "" || null;
  // req.body.userToken = await jwt.sign({ user: { ...req.body } }, KEY, {
  //   expiresIn: 60 * Min,
  // });
  try {
    var created = await User.create({ ...req.body });
    // res.json(RES(200, "Customer Registration Success"));
    if (created) {
      logs("Customer ", " New Admin Registered ");
      res.json(RES(200, "Admin has been Registered Successfully", created));
    } else res.json(RES(403, "Admin Registeration Failed"));
  } catch (e) {
    res.json(RES(403, "Registeration Error", e));
  }
};

module.exports.responderRegister = async (req, res, next) => {
  req.body.userActivation = req.body.userActivation || null;
  req.body.userAssignment = req.body.userAssignment || 0;
  req.body.approval = req.body.approval || false;
  req.body.roleId = 4;
  // req.body.serviceId = 1;
  req.body.subscriptionId = req.body.subscriptionId || null;
  req.body.image = req.body.image | "";
  req.body.deviceId = req.body.deviceId || null;
  req.body.fcmToken = req.body.fcmToken || null;
  req.body.forgetToken = req.body.forgetToken || null;
  req.body.userToken = req.body.userToken || null;
  req.body.uniqueId = req.body.uniqueId || null;
  req.body.groupId = req.body.groupId || null;
  req.body.trackingId = req.body.trackingId || null;
  req.body.password = req.body.password || "" || null;
  req.body.extNumber = req.body.extNumber || null;
  req.body.extPass = req.body.extPass || null;
  var created = await User.create({ ...req.body });
  // res.json(req.body);
  if (created != null) {
    logs("Responder", " New Responder User Registered ");
    res.json(RES(200, "Responder Registration Success", created));
  } else res.json(RES(403, "Responder Registeration Failed"));
};

module.exports.responderMemberRegister = async (req, res, next) => {
  // if (
  // CheckIfEmpty(req.body.firstname) &&
  // CheckIfEmpty(req.body.lastname) &&
  // CheckIfEmpty(req.body.cnic) &&
  // CheckIfEmpty(req.body.contact) &&
  // CheckIfEmpty(req.body.email) &&
  // CheckIfEmpty(req.body.password) &&
  // CheckIfEmpty(req.body.lat) &&
  // CheckIfEmpty(req.body.lng) &&
  // CheckIfEmpty(req.body.city) &&
  // CheckIfEmpty(req.body.street) &&
  // CheckIfEmpty(req.body.house) &&
  // CheckIfEmpty(req.body.town) &&
  //   CheckIfEmpty(req.body.deviceId) &&
  //   CheckIfEmpty(req.body.mapAddress) &&
  //   CheckIfEmpty(req.body.fcmToken)
  // )
  req.body.userActivation = true;
  req.body.approval = false;
  req.body.roleId = 8;
  req.body.serviceId = 1;
  var created = await User.create({ ...req.body });
  if (created) {
    logs("Responder Member", " New Responder Member User Registered ");
    res.json(RES(200, "Responder Member Registration Success", created));
  } else res.json(RES(403, "Responder Member Registeration Failed"));
};

module.exports.supervisorRegister = async (req, res, next) => {
  if (
    CheckIfEmpty(req.body.firstname) &&
    CheckIfEmpty(req.body.lastname) &&
    // CheckIfEmpty(req.body.cnic) &&
    CheckIfEmpty(req.body.contact) &&
    CheckIfEmpty(req.body.email) &&
    CheckIfEmpty(req.body.password)
    // CheckIfEmpty(req.body.lat) &&
    // CheckIfEmpty(req.body.lng) &&
    // CheckIfEmpty(req.body.city) &&
    // CheckIfEmpty(req.body.street) &&
    // CheckIfEmpty(req.body.house) &&
    // CheckIfEmpty(req.body.town) &&
    // CheckIfEmpty(req.body.deviceId) &&
    // CheckIfEmpty(req.body.mapAddress) &&
    // CheckIfEmpty(req.body.fcmToken)
  ) {
    // res.json(RES("Check: ", { ...req.body }));
    // res.json(RES("Check"));
    req.body.userActivation = req.body.userActivation || null;
    req.body.userAssignment = req.body.userAssignment || 0;
    req.body.approval = req.body.approval || false;
    req.body.roleId = 2;
    // req.body.serviceId = 1;
    req.body.subscriptionId = req.body.subscriptionId || null;
    req.body.image = req.body.image | "";
    req.body.deviceId = req.body.deviceId || null;
    req.body.fcmToken = req.body.fcmToken || null;
    req.body.forgetToken = req.body.forgetToken || null;
    req.body.userToken = req.body.userToken || null;
    req.body.uniqueId = req.body.uniqueId || null;
    req.body.groupId = req.body.groupId || null;
    req.body.block = req.body.block || null;
    req.body.subscriptionExpiry = req.body.subscriptionExpiry || null;
    req.body.subscriptionDuration = req.body.subscriptionDuration || null;
    req.body.mapAddress = req.body.mapAddress || null;
    req.body.trackingId = null;
    req.body.password = req.body.password || "" || null;
    var created = await User.create({ ...req.body });
    if (created) {
      logs("Supervisor Member", " New Supervisor Member User Registered ");
      res.json(RES(200, "Supervisor Registration Success", created));
    } else res.json(RES(403, "Supervisor Registeration Failed"));
  }
};

module.exports.customerFamilyRegister = async (req, res, next) => {
  if (
    CheckIfEmpty(req.body.firstname) &&
    CheckIfEmpty(req.body.lastname) &&
    // CheckIfEmpty(req.body.cnic) &&
    CheckIfEmpty(req.body.contact) &&
    // CheckIfEmpty(req.body.email) &&
    CheckIfEmpty(req.body.password) &&
    // CheckIfEmpty(req.body.lat) &&
    // CheckIfEmpty(req.body.lng) &&
    // CheckIfEmpty(req.body.city) &&
    // CheckIfEmpty(req.body.street) &&
    // CheckIfEmpty(req.body.house) &&
    // CheckIfEmpty(req.body.town) &&
    // CheckIfEmpty(req.body.deviceId) &&
    // CheckIfEmpty(req.body.mapAddress) &&
    // CheckIfEmpty(req.body.fcmToken) &&
    CheckIfEmpty(req.body.custId)
  ) {
    req.body.userActivation = req.body.userActivation || null;
    req.body.userAssignment = req.body.userAssignment || 0;
    req.body.approval = req.body.approval || false;
    req.body.cnic = req.body.cnic || "";
    req.body.roleId = 6;
    // req.body.serviceId = 1;
    req.body.subscriptionId = req.body.subscriptionId || null;
    req.body.image = req.body.image | "";
    req.body.deviceId = req.body.deviceId || null;
    req.body.fcmToken = req.body.fcmToken || null;
    req.body.forgetToken = req.body.forgetToken || null;
    req.body.userToken = req.body.userToken || null;
    req.body.uniqueId = req.body.uniqueId || null;
    req.body.groupId = req.body.groupId || null;
    req.body.trackingId = null;
    req.body.password = req.body.password || "" || null;
    var created = await User.create({ ...req.body });
    if (created) {
      logs("Customer Family User", " New Customer Family User Registered ");
      res.json(RES(200, "Customer Family Registration Success", created));
    } else res.json(RES(403, "Customer Family Registeration Failed"));
  }
};

/**
 * Method to Update a Specific User
 */
module.exports.updateUser = async (req, res, next) => {
  if (CheckIfEmpty(req.body.userId)) {
    var user = await User.findOne({ where: { id: req.body.userId } });
    if (user) {
      user.update({ ...req.body });
      logs("User", "User ( " + req.body.userId + " ) Updated ");
      res.json(RES(200, "Successfull"));
      let approveBy = await User.findOne({
        where: { id: req.body.approvedBy },
      });
      if (req.body.approval == true) {
        await ind(
          user.fcmToken,
          "Request Approved",
          "Your request has been accepted by the Service Provider",
          {
            // firstname: responder.firstname,
            // lastname: responder.lastname,
            // deviceId: JSON.stringify(responder.trackingId),
            KeyIntent: "ServiceProviderStatus",
          },
          (detail) => {
            console.log("Done !");
          }
        );
        await addLogs(
          "Request Approved",
          "Your request has been accepted by the Service Provider",
          approveBy.id,
          approveBy.firstname,
          user.id,
          user.firstname,
          {
            KeyIntent: "ServiceProviderStatus",
          }
        );
      }
    } else res.json(RES(403, "No Data Matched"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Remove a Specific User
 */
module.exports.removeUser = async (req, res, next) => {
  if (CheckIfEmpty(req.body.id)) {
    var user = await User.destroy({ where: { id: req.body.id } });
    if (user) {
      logs("User", "User ( " + req.body.id + " ) Deleted ");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "Deletion Error"));
  } else res.json(RES(403, "Parameter Not Found"));
};

/**
 * Method to Remove a Specific User with unique Id from the Traccar Database
 */
module.exports.removeUserWithUniqueId = async (req, res, next) => {
  if (CheckIfEmpty(req.body.id)) {
    var user = await User.destroy({ where: { trackingId: req.body.id } });
    if (user) {
      logs("User", "User UniquelyTraccar ( " + req.body.id + " ) Deleted ");
      res.json(RES(200, "Success"));
    } else res.json(RES(403, "Deletion Error"));
  }
};

/**
 * Method to Fetch all Users from the Database
 */
module.exports.fetchAllUsers = async (req, res, next) => {
  var users = await User.findAll({ include: [Role] });
  if (users) {
    logs(" Users ", "All Users fetched");
    res.json(RES(200, "Success", users));
  } else res.json(RES(403, "SQL Error"));
};

/**
 * Method to Fetch a Specific Customer depending upon approval from the Database
 */
module.exports.filterAllFalse = async (req, res, next) => {
  if (CheckIfEmpty(req.body.id)) {
    var user = await User.findOne({
      where: { id: req.body.id, roleId: 5, approval: false },
    });
    // res.json(RES(403, "Credentials Error"));
    if (user) {
      logs(
        " Specific User Fetched ",
        " Fetching a Specific User with false approval from the Database "
      );
      res.json(RES(200, "Success", user));
    } else res.json(RES(403, "No Data Matched Error"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Fetch a Specific Customer depending upon approval from the Database
 */
module.exports.filterAllTrue = async (req, res, next) => {
  if (CheckIfEmpty(req.body.id)) {
    var user = await User.findOne({
      where: { id: req.body.id, roleId: 5, approval: true },
    });
    // res.json(RES(403, "Credentials Error"));
    if (user) {
      logs(
        " Specific User Fetched ",
        " Fetching a Specific User with true approval from the Database "
      );
      res.json(RES(200, "Success", user));
    } else res.json(RES(403, "No Data Matched Error"));
  } else res.json(RES(403, "Credentials Error"));
};

/**
 * Method to Fetch a Specific Profile from the Database
 */
module.exports.filterSingleProfile = async (req, res, next) => {
  if (CheckIfEmpty(req.body.userId)) {
    var user = await User.findOne({
      where: { id: req.body.userId, roleId: [5, 6] },
    });
    // re s.json(RES(403, "Credentials Error"));
    if (user) {
      logs(
        " Specific User Profile Fetched ",
        " Fetching a Specific user Profile from the Database "
      );
      res.json(RES(200, "Success", user));
    } else res.json(RES(403, "No Data Matched Error"));
  } else res.json(RES(403, "Credentials Error"));
};
