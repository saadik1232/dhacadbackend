/**
 * Importing Libraries to Handle Routing
 */
const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

/**
 * Importing Controller
 */
const con = require("../controllers2/ImageUpload");

/**
 * End Point for => public notification CRUDs
 */
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(fileUpload());
router.post("/upload", con.create);
router.get("/getall", con.getallimage);
router.get("/getall2", con.getallimage2);

module.exports = router;
