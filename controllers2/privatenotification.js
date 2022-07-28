/**
 * API Response Standard Format
 */
var RES = require("../helpers/utils").response;
var PNotification = require("../helpers/fire").PMessage;
const User = require("../models/user");
var IP = require("../configs/config").IP;
var port = require("../configs/config").PORT;
//var silenenotification = require("../helpers/fire").silentNotificationFCM;
//var URL = "http://192.168.100.108:3001/images/upload_images/";
var URL = String("http://" + IP + ":" + port + "/images/upload_images/");
/**
 * Importing private Notification Database Model
 */
const privateNotification = require("./../models/privateNotification");
/**
 * Method to Add a New private Notification
 */
module.exports.create = async (req, res, next) => {
  const nDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Karachi",
  });
  var user = await User.findOne({
    where: { fcmToken: req.body.FCM_token },
  });
  if (user) {
    var contact = user.contact;
  }

  // var user = await User.findOne({ where: { fcmToken: req.body.FCM_token } });
  else {
    var contact = "";
  }
  const { heading, Message, FCM_token, active, priority } = req.body;
  if (req.file) {
    const image_name = req.file.originalname;
    var imagepath = String(URL + image_name);
    var created = await privateNotification.create({
      heading: heading,
      Message: Message,
      FCM_token: FCM_token,
      image_name: imagepath,
      active: active,
      priority: priority,
      contact: contact,
      time: nDate,
      viewed: false,
    });
    if (created) {
      var key = "";
      var notificationtype = "private notification";
      PNotification(
        heading,
        Message,
        FCM_token,
        imagepath,
        key,
        notificationtype
      );
      //console.log("Image Path:", imagepath);
      res.json(RES(200, "success"));
    } else {
      res.json(RES(400, "Error in posting please check your database"));
    }
  } else {
    imagepath = "No image for this notification";
    var created = await privateNotification.create({
      heading: heading,
      Message: Message,
      FCM_token: FCM_token,
      image_name: imagepath,
      active: active,
      priority: priority,
      time: nDate,
      viewed: false,
    });
    if (created) {
      PNotification(heading, Message, FCM_token, imagepath);
      //console.log("Image Path:", imagepath);
      res.json(RES(200, "success"));
    } else {
      res.json(RES(400, "Error in posting please check your database"));
    }
  }
};

module.exports.getallnotifications = async (req, res, next) => {
  var tempnotification = [];
  var asendNotifications = [];
  var allnotification = await privateNotification.findAll({});
  if (allnotification) {
    asendNotifications = allnotification.sort(function (a, b) {
      return b.id - a.id;
    });
    tempnotification = asendNotifications.filter(function (notification) {
      return notification.active !== false;
    });
    var sortedNotifications = tempnotification.sort(function (a, b) {
      return a.priority - b.priority;
    });
    res.json(RES(200, "success", sortedNotifications));
  } else {
    res.json(RES(403, "Error in get all please check your database"));
  }
};
module.exports.getusernotifications = async (req, res, next) => {
  var tempnotification = [];
  var asendNotifications = [];
  var allnotification = await privateNotification.findAll({});
  if (allnotification) {
    asendNotifications = allnotification.sort(function (a, b) {
      return b.id - a.id;
    });
    tempnotification = asendNotifications.filter(function (notification) {
      return (
        notification.active !== false &&
        notification.contact === req.body.contact
      );
    });
    var sortedNotifications = tempnotification.sort(function (a, b) {
      return a.priority - b.priority;
    });
    res.json(RES(200, "success", sortedNotifications));
  } else {
    res.json(RES(403, "Error in get all please check your database"));
  }
};

module.exports.delete = async (req, res, next) => {
  var deletenotification = await privateNotification.destroy({
    where: { id: req.body.id },
  });
  if (deletenotification) {
    res.json(RES(200, "Notification successfully deleated"));
  } else {
    res.json(RES(200, "Error in delation please check your database"));
  }
};
module.exports.updatepublicnotification = async (req, res, next) => {
  const { FCM_token } = req.body;
  var key = "silent";
  var notificationtype = "private notification";
  var updateNotification = await privateNotification.findOne({
    where: { id: req.body.id },
  });
  if (updateNotification) {
    updateNotification.update({ active: 0 });
    PNotification("", "", FCM_token, "", key, notificationtype);

    res.json(RES(200, "Notification updated successfully"));
  } else {
    res.json(RES(400, "Notification not found in database"));
  }
};
module.exports.notificationViewed = async (req, res, next) => {
  var updateNotification = await privateNotification.findOne({
    where: { id: req.body.id },
  });
  if (updateNotification) {
    updateNotification.update({ viewed: true });
    res.json(RES(200, "Notification updated successfully"));
  } else {
    res.json(RES(400, "Notification not found in database"));
  }
};
