const FileType = require("file-type");
/**
 * API Response Standard Format
 */
var RES = require("../helpers/utils").response;
//var PNotification = require("../helpers/fire").PMessage;
/**
 * Importing private Notification Database Model
 */
const ImageUpload = require("./../models/ImageUpload");
/**
 * Method to Add a New images
 */
module.exports.create = async (req, res, next) => {
  const { name, data } = req.files.pic;
  var created = await ImageUpload.create({
    image_name: name,
    image_data: data,
  });
  if (created) {
    res.json(RES(200, "success"));
  } else {
    res.json(RES(200, "Error in posting please check your database"));
  }
};

module.exports.getallimage = async (req, res, next) => {
  var allimages = await ImageUpload.findAll({});
  if (allimages) {
    res.json(RES(200, "success", allimages));
  } else {
    res.json(RES(403, "Error in get all please check your database"));
  }
};

module.exports.getallimage2 = async (req, res, next) => {
  var allimages = await ImageUpload.findAll({});
  if (allimages) {
    //const contentType = await FileType.fromBuffer(allimages);
    // res.type(contentType.mime);
    res.json(RES(200, "success", allimages));
  } else {
    res.json(RES(403, "Error in get all please check your database"));
  }
};
