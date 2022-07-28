/**
 * Importing Libraries to Handle Routing
 */
const express = require("express");
const router = express.Router();
var multer = require("multer");
//var upload = multer({ dest: "public/images/upload images" });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/upload_images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

/**
 * Importing Controller
 */
const con = require("../controllers2/publicnotification");

/**
 * End Point for => public notification CRUDs
 */
router.post("/add", upload.single("image_name"), con.create);
router.post("/getall", con.getallnotifications);
router.delete("/delete", con.delete);
router.post("/update", con.updatepublicnotification);
router.post("/viewed", con.notificationViewed);
module.exports = router;
