/**
 * API Response Standard Format
 */
var RES = require("../helpers/utils").response;
var IP = require("../configs/config").IP;
var port = require("../configs/config").PORT;
//var URL = "http://192.168.100.108:3001/images/upload_images/";
var URL = String("http://" + IP + ":" + port + "/images/upload_images/");
/**
 * Importing public Notification Database Model
 */
const publicNotification = require("./../models/publicnotification");
const TopicNotification = require("../helpers/fire").TopicNotification;
const silentNotificationtopic = require("../helpers/fire")
  .silentNotificationtopic;
/**
 * Method to Add a New public Notification
 */

exports.create = async function (req, res) {
  const nDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Karachi",
  });
  // console.log("Image file", req.file);
  // console.log("body", req.body);
  var key = "";
  var notificationtype = "public notification";
  const { heading, Message, topic, active, priority } = req.body;
  if (req.file) {
    const image_name = req.file.originalname;
    var imagepath = String(URL + image_name);
    var created = await publicNotification.create({
      heading: heading,
      Message: Message,
      topic: topic,
      image_name: imagepath,
      active: active,
      priority: priority,
      time: nDate,
      viewed: false,
    });
    if (created) {
      TopicNotification(
        heading,
        Message,
        topic,
        imagepath,
        active,
        priority,
        key,
        notificationtype
      );
      console.log("Image Path:", imagepath);
      res.json(RES(200, "success"));
    } else {
      res.json(RES(400, "Error in posting please check your database"));
    }
  } else {
    imagepath = "No image for this notification";
    var created = await publicNotification.create({
      heading: heading,
      Message: Message,
      topic: topic,
      image_name: imagepath,
      active: active,
      priority: priority,
      time: nDate,
      viewed: false,
    });
    if (created) {
      TopicNotification(
        heading,
        Message,
        topic,
        imagepath,
        active,
        priority,
        key,
        notificationtype
      );
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
  var allnotification = await publicNotification.findAll({});
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
    //res.json(sortedNotifications);
  } else {
    res.json(RES(403, "Error in get all please check your database"));
  }
};

module.exports.delete = async (req, res, next) => {
  var deletenotification = await publicNotification.destroy({
    where: { id: req.body.id },
  });
  if (deletenotification) {
    res.json(RES(200, "Notification successfully deleated"));
  } else {
    res.json(RES(200, "Error in delation please check your database"));
  }
};

module.exports.updatepublicnotification = async (req, res, next) => {
  var key = "silent";
  var notificationtype = "public notification";
  const { topic } = req.body;
  var updateNotification = await publicNotification.findOne({
    where: { id: req.body.id },
  });
  if (updateNotification) {
    updateNotification.update({ active: 0 });
    TopicNotification("", "", topic, "", "", "", key, notificationtype);
    //silentNotificationtopic(key, notificationtype, topic);
    res.json(RES(200, "Notification updated successfully"));
  } else {
    res.json(RES(400, "Notification not found in database"));
  }
};

module.exports.notificationViewed = async (req, res, next) => {
  // console.log("/////////req,body/////////", req.body.id);
  var updateNotification = await publicNotification.findOne({
    where: { id: req.body.id },
  });
  if (updateNotification) {
    updateNotification.update({ viewed: true });
    res.json(RES(200, "Notification updated successfully"));
  } else {
    res.json(RES(400, "Notification not found in database"));
  }
};
