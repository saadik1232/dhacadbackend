/**
 * Importing Libraries to Handle Routing
 */
const express = require("express");
const router = express.Router();

/**
 * Importing Controller
 */
const con = require("../controllers2/user");

/**
 * End Point for => User CRUDs
 */
router.get("/all", con.fetchAllUsers);
router.post("/del/unique", con.removeUserWithUniqueId);
router.post("/del/:id", con.removeUser);
router.post("/customer-register", con.customerRegister);
router.post("/customer-family-register", con.customerFamilyRegister);
router.post("/operator-register", con.operatorRegister);
router.post("/responder-register", con.responderRegister);
router.post("/responder-member-register", con.responderMemberRegister);
router.post("/supervisor-register", con.supervisorRegister);
router.post("/admin-register", con.adminRegister);
router.put("/update", con.updateUser);
router.post("/filterAllFalse", con.filterAllFalse);
router.post("/filterAllTrue", con.filterAllTrue);
router.post("/filterSingleProfile", con.filterSingleProfile);

module.exports = router;
