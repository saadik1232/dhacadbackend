const express = require("express");
const router = express.Router();

/**
 * Importing Controller
 */
const con = require("../controllers2/calls");

/**
 * End Point for => Bank Credential Verification
 */
router.post("/automateCall", con.automatedCall);
router.post("/conferenceCall", con.conferenceCall);
router.post("/singleCall", con.singleCall);

module.exports = router;
