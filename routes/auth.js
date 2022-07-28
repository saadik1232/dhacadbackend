/**
 * Importing Libraries to Handle Routing
 */
const express = require("express");
const router = express.Router();

/**
 * Importing Controller
 */
const con = require("../controllers/auth");

router.get("/users/all", con.fetchAllUsers);
router.get("/users/operators", con.fetchAllOperators);
router.get("/users/operator/:id", con.fetchOperator);
router.delete("/user/del/:id", con.removeUser);
router.post("/register", con.register);
router.put("/updateUser/:id", con.updateUser); // Updates the User
router.post("/login", con.login);
router.post("/tokenCheck", con.tokenCheck);
router.get("/approve/:id", con.approve);
router.post("/operators/revert", con.operatorsRevert);
router.get("/operator/status", con.operatorStatus);
router.post("/responder/status", con.responderStatus);
router.post("/responder/confirm", con.responderConfirmStatus);
router.post("/responder/resolve", con.responderResolveStatus);

// Attached Devices
router.post("/user/device/add", con.customerAddDevice); // { number , userId }
router.post("/user/device/get", con.getCustomerDevices);
router.post("/user/device/getAll", con.getAllCustomerDevices);
router.post("/user/device/remove", con.removeCustomerDevices);

// Responder Locations
router.post("/user/responder/locations", con.getAllResponderLocation);
router.post("/user/responder/locations/:id", con.getResponderLocation);
router.post("/user/responder/sendLocation/:id", con.sendResponderLocation);

module.exports = router;
