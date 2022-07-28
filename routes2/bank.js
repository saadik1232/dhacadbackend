/**
 * Importing Libraries to Handle Routing
 */
const express = require("express");
const router = express.Router();

/**
 * Importing Controller
 */
const con = require("../controllers2/bank");

/**
 * End Point for => Bank Credential Verification
 */
router.post("/verify", con.verify);

module.exports = router;
