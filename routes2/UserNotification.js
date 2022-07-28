/**
 * Importing Libraries to Handle Routing
 */
const express = require("express");
const router = express.Router();

/**
 * Importing Controller
 */
const con = require("../controllers2/UserNotification");

/**
 * End Point for => public notification CRUDs
 */
router.post("/add", con.create);
router.post("/getall", con.getallnotifications);
module.exports = router;
