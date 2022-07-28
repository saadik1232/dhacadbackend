/**
 * Importing Libraries to Handle Routing
 */
const express = require("express");
const router = express.Router();

/**
 * Importing Controller
 */
const con = require("../controllers2/logs");

/**
 * End Point for => Responder
 */
router.get("/", con.fetchAll);
router.post("/filter", con.customerFilter);

module.exports = router;
