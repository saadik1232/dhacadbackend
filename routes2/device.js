/**
 * Importing Libraries to Handle Routing
 */
const express = require("express");
const router = express.Router();

/**
 * Importing Controller
 */
const con = require("../controllers/device");

/**
 * End Point for => User Device
 */
router.post("/user/device/add", con.customerAddDevice); // { number , userId }
router.post("/user/device/get", con.getCustomerDevices);
router.post("/user/device/getAll", con.getAllCustomerDevices);
router.post("/user/device/remove", con.removeCustomerDevices);

module.exports = router;
